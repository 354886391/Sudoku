import { _decorator, Node, Component, UITransform, Prefab, BlockInputEvents, Tween, TweenEasing, Constructor, Vec3, director, instantiate, isValid, tween, view, warn, Enum, find } from 'cc';
import { UIView } from './UIView';
import { Eventer } from '../tool/Eventer';
import { Singleton } from '../util/Singleton';
import { UIAdapter } from './UIAdapter';
import { ResourceManager } from '../resources/ResourceManager';
import { Util } from '../util/Util';

const { ccclass, property } = _decorator;

export enum UILayer {
    view = 0,
    default = 1,           // 默认层级
    popup = 2,              // 弹出层
    notice = 3,             // 通知层
}

export enum UIZIndex {
    views = 1,
    popup,
    notice = 999,
    message,
    max,
}

export enum UIEvent {
    UIOpenBefore = "UIOpenBefore",
    UIOpened = "UIOpen",
    UICloseBefore = "UICloseBefore",
    UIClosed = "UIClose",
}

/** UI配置 */
export interface UIOption {
    name: string;
    path: string;           // 预制体路径
    bundle: string,
    hasMask: boolean;       // 添加遮罩
    isCache: boolean;       // 是否缓存
    isPreload: boolean;     // 是否预加载
    layerIndex: number;     // 所属层级

    openTween?: ViewTween;  // 动画配置
    closeTween?: ViewTween;
    fadeTween?: ViewTween;
}

interface ViewTween {
    time: number,
    start: Vec3,
    target: Vec3,
    easing: TweenEasing,
}

/** UI信息 */
interface UIInfo {
    id: string;
    view?: UIView;
    layer?: IUILayer;
    option?: UIOption;
    // 属性
    args?: any[];
    zOrder?: number;
    isClosed?: boolean;
}

export class IUILayer extends Component {

    maskNode: Node;
    layerIndex: UILayer;

    protected __preload(): void {
        this.maskNode = find("mask", this.node);
        UIManager.instance.addUILayer(this.layerIndex, this);
    }

    addView(view: UIView): void {
        throw new Error('Method not override.');
    }

    removeView(view: UIView): void {
        throw new Error('Method not override.');
    }

    setMask(visible: boolean): void {
        this.maskNode.active = visible;
    }
}

@ccclass('UIManager')
export class UIManager extends Singleton<UIManager>() {

    /** 标识符 */
    private _uiId: number = 0;
    /** 是否正在关闭UI */
    private _isClosing: boolean = false;
    /** 是否正在打开UI */
    private _isOpening: boolean = false;
    /** UI界面堆栈 */
    private _uiStack: UIInfo[] = [];
    /** UI界面层级 */
    private _uiLayers: IUILayer[] = [];
    /** UI待打开列表 */
    private _uiOpenQueue: UIInfo[] = [];
    /** UI待关闭列表 */
    private _uiCloseQueue: UIInfo[] = [];
    /** UI界面缓存 */
    private _uiCaches: { [uiId: string]: UIView } = {};
    /** UI界面配置 */
    private _uiOptions: { [key: string]: UIOption } = {};
    /** 预加载列表 */
    private _uiPreloads: { [key: string]: Constructor<UIView> } = {};

    /**
    * 初始化所有UI的配置对象
    * @param options 配置对象
    */
    init(options: { [key: string]: UIOption }): void {
        this._uiOptions = options;
        UIAdapter.initResolution();
        // 界面预加载
        for (let key in options) {
            let opt = options[key];
            if (opt.isPreload && this._uiPreloads[opt.name] != null) {
                this.preload(this._uiPreloads[opt.name]);
            }
        }
    }

    /**
     * 注册需要预加载的界面
     * @param uiView 界面构造函数
     */
    register(uiView: Constructor<UIView>): void {
        this._uiPreloads[uiView.name] = uiView;
    }

    /** 预加载 */
    public async preload<T extends UIView>(constructor: Constructor<T>): Promise<UIView> {
        let uiId: string = this.getUIId(constructor);
        if (this._uiCaches[uiId] != null) {
            warn(`缓存中已有 ${constructor.name} 资源, 不需要再预加载`);
            return;
        }
        let uiOption: UIOption = this.getUIOption(constructor);
        let uiInfo: UIInfo = {
            id: uiId,
            option: uiOption,
        };
        return new Promise((resolve, reject) => {
            this.create(uiInfo, (uiView: UIView): void => {
                if (uiView == null) {
                    warn(`create ${constructor.name} fail! uiInfo : ${uiInfo}`);
                    return;
                }
                // 在资源加载完成后保存到cache
                this._uiCaches[uiId] = uiView;
                // 从加载列表中删除已加载项
                if (this._uiPreloads[constructor.name] != null) {
                    delete this._uiPreloads[constructor.name];
                }
                isValid(uiView) ? resolve(uiView) : reject();
            }, null);
        });
    }

    /**
    * 创建Prefab
    * @param callback 加载完成回调
    * @param uiArgs 初始化参数
    */
    private create(uiInfo: UIInfo, callback: (uiView: UIView) => void, uiArgs: any[]): void {
        let uiId: string = uiInfo.id;
        // 如果找到缓存对象, 则直接返回
        let uiView: UIView = this._uiCaches[uiId];
        if (uiView) {
            callback(uiView);
            return;
        }
        // 找到UI配置
        let uiPath: string = uiInfo.option.path;
        let bundle: string = uiInfo.option.bundle;
        if (uiPath == null) {
            warn(`find ${uiId} fail, uiPath not found!`);
            callback(null);
            return;
        }
        let createNode = (prefab: Prefab) => {
            let uiNode: Node = instantiate(prefab);
            // 检查实例化错误
            if (uiNode == null) {
                warn(`create instantiate ${uiId} fail, path: ${uiPath}`);
                callback(null);
                return;
            }
            uiView = uiNode.getComponent(UIView);
            // 检查组件获取错误
            if (uiView == null) {
                warn(`create getComponent ${uiId} fail, path: ${uiPath}`);
                uiNode.destroy();
                callback(null);
                return;
            }
            callback(uiView);
        };
        // 加载获取prefab资源
        ResourceManager.instance.load(bundle, uiPath, Prefab, null, (data) => {
            if (data) {
                createNode(<Prefab>(data)); // 创建节点并初始化UIView
            }
        });
    }

    /** 打开界面并添加到界面栈中
     * @param uiArgs 传入参数
     */
    public async open<T extends UIView>(constructor: Constructor<T>, ...uiArgs: any[]): Promise<UIView> {
        // 获取类的id索引
        let uiId: string = this.getUIId(constructor);
        let uiLayer: IUILayer = this.getUILayer(constructor);
        let uiOption: UIOption = this.getUIOption(constructor);
        let uiInfo: UIInfo = {
            id: uiId,
            args: uiArgs,
            layer: uiLayer,
            option: uiOption,
        };
        // 正在打开或关闭界面时, 插入到待打开队列
        if (this._isOpening || this._isClosing) {
            this._uiOpenQueue.push(uiInfo);
            return;
        }
        // 重复打开了同一个界面, 返回
        let uiIndex: number = this.getUIIndex(uiId);
        if (uiIndex != -1) {
            let info: UIInfo = this._uiStack[uiIndex];
            // 界面已存在
            if (info && info.view && isValid(info.view.node)) {
                info.view.node.parent = uiLayer.node;
                info.view.node.active = true;
            }
            return;
        }
        // 设置UI的zOrder
        let topView: UIView = this.getTopView();
        if (topView && topView.node.active) {
            uiInfo.zOrder = topView.node.zIndex + 1;
        } else {
            uiInfo.zOrder = this._uiStack.length + 1;
        }
        this._isOpening = true;
        // 加载资源, 并在资源加载完成后自动打开界面
        return new Promise((resolve, reject) => {
            this.create(uiInfo, (uiView: UIView): void => {
                // 如果界面已经关闭或创建失败
                if (uiInfo.isClosed || uiView == null) {
                    warn(`create ${uiId} fail! close state : ${uiInfo.isClosed} , uiView : ${uiView}`);
                    this._isOpening = false;
                    return;
                }
                uiInfo.view = uiView;
                uiView.init.apply(uiView, uiArgs);  // 此时未设置uiView的parent, 所以onLoad并未激活
                this.onOpen(uiInfo, uiArgs);        // 打开UI界面
                this.autoOpenNext();
                isValid(uiView) ? resolve(uiView) : reject();
            }, uiArgs);
        });
    }

    public async openBy(uiInfo: UIInfo): Promise<UIView> {
        let uiId = uiInfo.id;
        let uiArgs = uiInfo.args;
        // 正在打开或关闭界面时, 插入到待打开队列
        if (this._isOpening || this._isClosing) {
            this._uiOpenQueue.push(uiInfo);
            return;
        }
        // 重复打开了同一个界面, 返回
        let uiIndex: number = this.getUIIndex(uiId);
        if (-1 != uiIndex) {
            let info: UIInfo = this._uiStack[uiIndex];
            // 界面已存在
            if (info && info.view && isValid(info.view.node)) {
                info.view.node.parent = info.layer.node;
                info.view.node.active = true;
            }
            return;
        }
        // 设置UI的zOrder
        let topUI: UIView = this.getTopView();
        if (topUI && topUI.node.active) {
            uiInfo.zOrder = topUI.node.getSiblingIndex() + 1;
        } else {
            uiInfo.zOrder = this._uiStack.length + 1;
        }
        this._isOpening = true;
        // 加载资源, 并在资源加载完成后自动打开界面
        return new Promise((resolve, reject) => {
            this.create(uiInfo, (uiView: UIView): void => {
                // 如果界面已经关闭或创建失败
                if (uiInfo.isClosed || uiView == null) {
                    warn(`create ${uiId} fail! close state : ${uiInfo.isClosed} , uiView : ${uiView}`);
                    this._isOpening = false;
                    return;
                }
                uiInfo.view = uiView;
                uiView.init.apply(uiView, uiArgs);
                this.onOpen(uiInfo, uiArgs);    // 打开UI界面
                isValid(uiView) ? resolve(uiView) : reject();
            }, uiArgs);
        });
    }

    /** UI被打开时回调，对UI进行初始化设置 */
    private onOpen(uiInfo: UIInfo, uiArgs: any[]): void {
        let uiId: string = uiInfo.id;
        let uiView: UIView = uiInfo.view;
        let uiLayer: IUILayer = uiInfo.layer;
        this._uiStack.push(uiInfo);
        this.setSiblingIndex(uiInfo, (uiInfo.zOrder || this._uiStack.length));
        let parent: Node = director.getScene().getChildByName("UI Canvas");

        if (isValid(uiLayer)) {
            parent = uiLayer.node;
        }
        // 激活界面
        uiView.node.active = true;
        // 添加到场景中
        uiView.node.parent = parent;
        // 打开界面之前的事件
        Eventer.emit(UIEvent.UIOpenBefore, uiId);
        let opening = () => {
            this._isOpening = false;
            uiView.onOpen.apply(uiView, uiArgs);
            Eventer.emit(UIEvent.UIOpened, uiId);

        }
        let option = uiInfo.option;
        if (option && option.openTween) {
            this.openViewAni(uiView, option, opening);
        } else {
            opening();
        }
    }

    /** 关闭当前界面 */
    public close<T extends UIView>(constructor: Constructor<T>): void {
        // 获取类的id索引
        let uiId: string = this.getUIId(constructor);
        let uiIndex: number = this.getUIIndex(uiId);
        if (-1 != uiIndex) {
            let uiInfo: UIInfo = this._uiStack[uiIndex];
            uiInfo.isClosed = true;
            this._isClosing = true;
            this._uiStack.splice(uiIndex, 1);

            let uiView: UIView = uiInfo.view;
            if (uiView == null) {
                return;
            }
            // 关闭界面之前的事件
            Eventer.emit(UIEvent.UICloseBefore, uiId);
            let option = uiInfo.option;
            let closing = () => {
                this._isClosing = false;
                uiView.onClose.apply(uiView);
                Eventer.emit(UIEvent.UIClosed, uiId);
                // 处理uiCache
                if (isValid(uiView.node)) {
                    if (option.isCache) {
                        this._uiCaches[uiId] = uiView;
                        uiView.node.removeFromParent();
                    } else {
                        delete this._uiCaches[uiId];
                        uiView.node.destroy();
                    }
                    this.autoOpenNext();
                }
            }
            if (option && option.closeTween) {
                this.closeViewAni(uiView, option, closing);
            } else {
                closing();
            }
        }
    }

    public closeBy(uiInfo: UIInfo): void {
        let uiId: string = uiInfo.id;
        let uiIndex: number = this.getUIIndex(uiId);
        if (-1 != uiIndex) {
            let uiInfo: UIInfo = this._uiStack[uiIndex];
            uiInfo.isClosed = true;
            this._isClosing = true;
            this._uiStack.splice(uiIndex, 1);

            let uiView: UIView = uiInfo.view;
            if (uiView == null) {
                return;
            }
            // 关闭界面之前的事件
            Eventer.emit(UIEvent.UICloseBefore, uiId);
            let option = uiInfo.option;
            let closing = () => {
                this._isClosing = false;
                uiView.onClose.apply(uiView);
                Eventer.emit(UIEvent.UIClosed, uiId);
                // 处理uiCache
                if (isValid(uiView.node)) {
                    if (option.isCache) {
                        this._uiCaches[uiId] = uiView;
                        uiView.node.removeFromParent();
                    } else {
                        delete this._uiCaches[uiId];
                        uiView.node.destroy();
                    }
                }
            }
            if (option && option.closeTween) {
                this.closeViewAni(uiView, option, closing);
            } else {
                closing();
            }
        }
    }

    /** 清除界面缓存 */
    public clearCache(): void {
        for (const key in this._uiCaches) {
            let ui: UIView = this._uiCaches[key];
            if (isValid(ui.node)) {
                ui.node.destroy();
            }
        }
        this._uiCaches = {};
    }

    /** 打开/关闭Queue中的界面 */
    private autoOpenNext(): void {
        if (this._uiOpenQueue.length > 0) {
            let uiInfo = this._uiOpenQueue[0];
            this._uiOpenQueue.splice(0, 1);
            this.openBy(uiInfo);
        }
    }

    private openViewAni(uiView: UIView, option: UIOption, callback: Function): void {
        if (uiView && uiView.node) {
            this.addLayerMask(option);
            this.addPreventTouch(uiView.node, option);
            this.playCommonAni(uiView.node, option.openTween, callback);
        } else {
            callback && callback();
        }
    }

    private closeViewAni(uiView: UIView, option: UIOption, callback: Function): void {
        if (uiView && uiView.node) {
            this.removeLayerMask(option);
            this.removePreventTouch(uiView.node, option);
            this.playCommonAni(uiView.node, option.closeTween, callback);
        } else {
            callback && callback();
        }
    }

    /** 视图动画 */
    private playCommonAni(node: Node, teen: ViewTween, callback: Function): void {
        Tween.stopAllByTarget(node);
        tween(node)
            .set({ scale: teen.start })
            .to(teen.time, { scale: teen.target }, { easing: teen.easing })
            .call(() => callback && callback())
            .start();
    }

    /** 添加防触摸层 */
    public addPreventTouch(parent: Node, option: UIOption): Node {
        let node: Node = new Node();
        let uiLayer = this.getUILayerBy(option.layerIndex);
        parent = parent ?? uiLayer.node;
        node.addComponent(UITransform).setContentSize(view.getVisibleSize());
        node.addComponent(BlockInputEvents);
        node.name = "PreventTouch";

        return node;
    }

    /** 移除防触摸层 */
    public removePreventTouch(parent: Node, option: UIOption): void {
        let uiLayer = this.getUILayerBy(option.layerIndex);
        parent = parent ?? uiLayer.node;
        let child: Node = parent.getChildByName("preventTouch");
        if (child) child.destroy();
    }

    private addLayerMask(option: UIOption): void {
        if (option.hasMask) {
            let layer = this.getUILayerBy(option.layerIndex);
            let mask: Node = find("mask", layer.node);
            if (mask) {
                mask.active = true;
            }
        }
    }

    private removeLayerMask(option: UIOption): void {
        if (option.hasMask) {
            let layer = this.getUILayerBy(option.layerIndex);
            let mask: Node = find("mask", layer.node);
            if (mask) {
                mask.active = false;
            }
        }
    }

    /******************** UI的便捷接口 *******************/
    public isTopView(uiId: string): boolean {
        if (this._uiStack.length == 0) {
            return false;
        }
        return this._uiStack[this._uiStack.length - 1].id == uiId;
    }

    public getView<T extends UIView>(constructor: Constructor<T>): T {
        let uiId = this.getUIId(constructor);
        let uiIndex = this.getUIIndex(uiId);
        return this._uiStack[uiIndex]?.view as T;
    }

    public getTopView(): UIView {
        for (let i = this._uiStack.length - 1; i >= 0; i--) {
            if (this._uiStack[i].view.node.getSiblingIndex() < UIZIndex.notice) {
                return this._uiStack[i].view;
            }
        }
        return null;
    }

    public setToTopView(constructor: Constructor<UIView>): void {
        let uiInfo: UIInfo = this.getUIInfo(constructor);
        let topUI: UIView = this.getTopView();
        if (topUI && topUI.node.active) {
            uiInfo.zOrder = topUI.node.getSiblingIndex() + 1;
        } else {
            uiInfo.zOrder = this._uiStack.length + 1;
        }
        this.updateZIndex(uiInfo.view.node);
    }

    public getUIIndex(uiId: string): number {
        for (let i = 0; i < this._uiStack.length; i++) {
            const uiInfo: UIInfo = this._uiStack[i];
            if (uiInfo.id == uiId) {
                if (isValid(uiInfo.view.node)) {
                    return i;
                } else {
                    this._uiStack.splice(i, 1);
                    return -1;
                }
            }
        }
        return -1;
    }

    public setSiblingIndex(info: UIInfo, zIndex: number): void {
        let view = info.view;
        let layer = info.layer;
        view.node.setSiblingIndex(zIndex);
        layer.scheduleOnce(() => {
            this.updateZIndex(layer.node);
        });
    }

    public setSiblingIndex2(constructor: Constructor<UIView>, zIndex: number): void {
        let info = this.getUIInfo(constructor);
        this.setSiblingIndex(info, zIndex);
    }

    public updateZIndex(parent: Node): void {
        let children: Node[] = parent.children.concat();
        children.sort((a, b): number => {
            if (a.zIndex == null) {
                a.zIndex = 0;
            }
            if (b.zIndex == null) {
                b.zIndex = 0;
            }
            return a.zIndex - b.zIndex;
        });
        let maxIndex: number = children.length;
        for (const node of children) {
            node.setSiblingIndex(maxIndex);
        }
    }

    /** 获取或添加 类的uiid */
    getUIId<T extends UIView>(constructor: Constructor<T>): string {
        if (constructor['__uiid__'] == null) {
            Object.defineProperty(constructor, '__uiid__', {
                value: this._uiId++,
                writable: false,
                configurable: false,
                enumerable: false,
            });
        }
        return constructor['__uiid__'];
    }

    /** 获取 类的uiPath */
    getUIPath<T extends UIView>(constructor: Constructor<T>): string {
        return this._uiOptions[constructor.name].path;
    }

    getUIInfo<T extends UIView>(constructor: Constructor<T>): UIInfo {
        let uiId: string = this.getUIId(constructor);
        let uiIndex: number = this.getUIIndex(uiId);
        if (uiIndex != -1) {
            return this._uiStack[uiIndex];
        }
        return null;
    }

    getUIOption<T extends UIView>(constructor: Constructor<T>): UIOption {
        return this._uiOptions[constructor.name];
    }

    getUILayer<T extends UIView>(constructor: Constructor<T>) {
        let layerIndex = this._uiOptions[constructor.name].layerIndex;
        return this._uiLayers[layerIndex];
    }

    getUILayerBy(index: number): IUILayer {
        return this._uiLayers[index];
    }

    addUILayer(index: number, layer: IUILayer): void {
        this._uiLayers[index] = layer;
    }
}
