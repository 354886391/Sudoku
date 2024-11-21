import { Component, Node, UI, _decorator } from "cc";
import { UIAdapter } from "./UIAdapter";
import { UIManager } from "./UIManager";
const { ccclass, property, menu } = _decorator;

/**
 * UIView 界面基础类
 */
@ccclass
@menu("ui/common/UIView")
export class UIView extends Component {

    /** 1. 有缓存则只执行一次(在onLoad之前调用, 只处理数据) */
    public init(...args: any[]): void { }

    /** 2. 当附加到一个激活的节点上或者其节点第一次激活时候调用 */
    protected onLoad() {
        this.node.addComponent(UIAdapter);
    }
    
    /** 3. 当界面被打开时回调 */
    public onOpen(...args: any[]): void { }

    /** todo: 有其他界面覆盖到这个界面后，被调用 */
    public onCover(): void { }

    /** todo: 这个界面从被覆盖的状态恢复到处于最上层后，被调用 */
    public onReveal(): void { }

    /** 当界面被关闭时回调 */
    public onClose(): void { }

    public setZIndex(zIndex: number) {
        // this.node.setSiblingIndex(zIndex);
        this.node.zIndex = zIndex;
    }
}
// UIManager.instance.register(this);
