import { _decorator, Node, Button, CCFloat, EventTouch, Color, UIRenderer, Sprite, } from "cc";

const { ccclass, menu, disallowMultiple, property } = _decorator;

@ccclass("UIButton")
@menu("ui/basic_ui/UIButton")
@disallowMultiple(true)
export class UIButton extends Button {

    @property({ displayName: "按钮冷却", type: CCFloat, tooltip: "按钮点击后的冷却时间，单位：秒" })
    public cd: number = 0.5;

    private inCd: boolean = false;
    private cdTime: number = 0;

    public touchBeganFun: Function;
    public touchMoveFun: Function;
    public touchEndedFun: Function;
    public touchCancelFun: Function;

    /** 按钮携带信息 */
    public data: any;

    /**
     * 按钮事件是否被响应，如果为 false，则按钮将被禁用。
     */
    get interactable() {
        return this._interactable;
    }
    set interactable(value) {
        this._interactable = value;
        if (this._interactable) {
            this._updateState();
        }
        else {
            this._resetState();
        }
    }

    public __preload() {
        super.__preload();
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    update(deltaTime: number) {
        super.update(deltaTime);
        if (!this.target) {
            return;
        }
        if (this._transition === Button.Transition.COLOR) {
            const render = this.target.getComponent(UIRenderer);
            if (render) {
                this.target.children.forEach((child) =>
                    this.updateChildColor(child, render.color)
                );
            }
        }
        if (this.inCd) {
            this.cdTime += deltaTime;
            if (this.cdTime >= this.cd) {
                this.cdTime = 0;
                this.inCd = false;
            }
        }
    }

    private onTouchStart(event?: EventTouch) {
        if (!this._interactable || !this.enabledInHierarchy) {
            return;
        }
        if (this.inCd) {
            Log.d("1 按钮在CD中...");
            return;
        }
        if (this.touchBeganFun) {
            this.touchBeganFun(event);
        }
    }

    private onTouchMove(event?: EventTouch) {
        if (!this._interactable || !this.enabledInHierarchy || !this["_pressed"]) {
            return;
        }
        if (!event || !event.touch) {
            return;
        }
        if (this.inCd) {
            Log.d("2 按钮在CD中...");
            return;
        }
        if (this.touchMoveFun) {
            this.touchMoveFun(event);
        }
    }

    private onTouchEnd(event?: EventTouch) {
        if (!this._interactable || !this.enabledInHierarchy) {
            return;
        }
        // 按钮冷却
        this.node.pauseSystemEvents(true);
        this.scheduleOnce(() => {
            this.node.resumeSystemEvents(true);
        }, this.cd);
        if (this.inCd) {
            Log.d("3 按钮在CD中...");
            return;
        }
        if (this.touchEndedFun) {
            this.touchEndedFun(event);
        }
        this.inCd = true;
        this.cdTime = 0;
    }

    private onTouchCancel(event?: EventTouch) {
        if (!this._interactable || !this.enabledInHierarchy) {
            return;
        }
        if (this.touchCancelFun) {
            this.touchCancelFun(event);
        }
    }

    /**
    * 更新子节点的颜色
    * @param node
    * @param color
    */
    private updateChildColor(node: Node, color: Color) {
        const render = node.getComponent(UIRenderer);
        if (render) {
            render.color = color;
        }
        node.children.forEach((child) => this.updateChildColor(child, color));
    }
}