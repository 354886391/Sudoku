import { _decorator, Component, Node, NodeEventType, EventTouch, UITransform, CCFloat } from "cc";

const { ccclass, property, menu, disallowMultiple } = _decorator;

/** 按钮状态枚举 */
enum ButtonState {
    NORMAL = "normal",
    HOVER = "hover",
    PRESSED = "pressed",
    DISABLED = "disabled",
    SELECT = "select",
}

@ccclass("UIButtonState")
@menu("ui/basic_ui/UIButtonState")
@disallowMultiple(true)
export class UIButtonState extends Component {
    @property({ displayName: "按钮冷却", type: CCFloat, tooltip: "按钮点击后的冷却时间，单位：秒" })
    public cd: number = 0.5;


    private inCd: boolean = false;
    private cdCount: number = 0;

    protected _state: ButtonState = ButtonState.NORMAL;
    protected _select: boolean;
    protected _pressed: boolean;
    protected _interactable = true;

    @property
    private _soundName: string;

    public touchBeganFun: Function;
    public touchMoveFun: Function;
    public touchEndedFun: Function;
    public touchCancelFun: Function;

    protected _normalNode: Node | null;
    protected _hoverNode: Node | null;
    protected _pressedNode: Node | null;
    protected _disabledNode: Node | null;
    protected _selectNode: Node | null;

    @property({ displayName: "normalNode", type: Node, tooltip: "普通状态的节点", })
    public get normalNode() {
        return this._normalNode;
    }
    public set normalNode(value: Node | null) {
        this._normalNode = value;
        this.updateState();
    }

    @property({ displayName: "hoverNode", type: Node, tooltip: "悬停状态下按钮所显示的节点", })
    get hoverNode() {
        return this._hoverNode;
    }
    set hoverNode(value: Node | null) {
        this._hoverNode = value;
    }

    @property({ displayName: "pressedNode", type: Node, tooltip: "按下状态时按钮所显示的节点", })
    get pressedNode() {
        return this._pressedNode;
    }
    set pressedNode(value: Node | null) {
        this._pressedNode = value;
    }

    @property({ displayName: "disabledNode", type: Node, tooltip: "禁用状态下按钮所显示的节点", })
    get disabledNode() {
        return this._disabledNode;
    }
    set disabledNode(value: Node | null) {
        this._disabledNode = value;
    }
    @property({ displayName: "selectNode", type: Node, tooltip: "选中状态下按钮所显示的节点", })
    get selectNode() {
        return this._selectNode;
    }
    set selectNode(value: Node | null) {
        this._selectNode = value;
    }

    public get select(): boolean {
        return this._select;
    }
    public set select(val: boolean) {
        this._select = val;
        if (val == true) {
            this._state = ButtonState.SELECT;
        }
        else {
            this._state = ButtonState.NORMAL;
        }
        this.updateState();
    }



    protected onLoad() {

        // this.node.on(Node.EventType.TOUCH_END, this.onTouchEnded, this);
        // this.node.on(Node.EventType.TOUCH_START, this.onTouchBegan, this);
        // this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        // this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        this.updateState();
    }

    update(deltaTime: number) {
        if (this.inCd == false) {
            return;
        }
        this.cdCount += deltaTime;
        if (this.cdCount >= this.cd) {
            this.cdCount = 0;
            this.inCd = false;
        }
    }

    protected updateState() {
        this.updateSpriteTransition(this._state);
    }

    protected updateSpriteTransition(state: string) {
        this.hideAllState();
        const mNode: Node = this[`${state}Node`];
        if (mNode) {
            mNode.active = true;
        } else if (state == ButtonState.DISABLED || state == ButtonState.SELECT) {
            if (this.pressedNode) {
                this.pressedNode.active = true;
            } else {
                this.normalNode.active = true;
            }
        } else {
            this.normalNode.active = true;
        }
    }

    private hideAllState() {
        if (this.normalNode) {
            this.normalNode.active = false;
        }
        if (this.hoverNode) {
            this.hoverNode.active = false;
        }
        if (this.pressedNode) {
            this.pressedNode.active = false;
        }
        if (this.disabledNode) {
            this.disabledNode.active = false;
        }
        if (this.selectNode) {
            this.selectNode.active = false;
        }
    }

    protected onEnable(): void {
        this.addToStage();
    }

    protected onDisable(): void {
        this.removeFromStage();
    }

    public setEnabled(value: boolean) {
        this.enabled = value;
        if (value == false) {
            this._state = ButtonState.DISABLED;
        } else if (this._state == ButtonState.DISABLED) {
            this._state = ButtonState.NORMAL;
        }
        this.updateState();
    }

    protected onTouchBegan(event?: EventTouch) {
        if (!this._interactable || !this.enabledInHierarchy) {
            return;
        }
        this._pressed = true;
        this._state = ButtonState.PRESSED;
        this.updateState();
        if (event) {
            event.propagationStopped = true;
        }
        if (this.inCd) {
            Log.d("按钮在CD中...");
            return;
        }
        if (this.touchBeganFun) {
            this.touchBeganFun(this, event);
        }
    }

    protected onTouchMove(event?: EventTouch) {
        if (!this._interactable ||
            !this.enabledInHierarchy ||
            !this._pressed) {
            return;
        }
        if (!event) {
            return;
        }
        const touch = event.touch;
        if (!touch) {
            return;
        }
        const hitTest = this.node.getComponent(UITransform).hitTest(touch.getLocation());
        if (hitTest) {
            this._state = ButtonState.PRESSED;
        } else {
            this._state = ButtonState.NORMAL;
        }
        this.updateState();
        if (event) {
            event.propagationStopped = true;
        }
        if (this.inCd) {
            Log.d("按钮在CD中...");
            return;
        }
        if (this.touchMoveFun) {
            this.touchMoveFun(this, event);
        }
    }

    protected onTouchEnded(event?: EventTouch) {
        if (!this._interactable || !this.enabledInHierarchy) {
            return;
        }
        this._pressed = false;
        this._state = ButtonState.NORMAL;
        this.updateState();
        if (event) {
            event.propagationStopped = true;
        }
        if (this.inCd) {
            Log.d("按钮在CD中...");
            return;
        }
        if (this._soundName) {
            // 
        }
        if (this.touchEndedFun) {
            this.touchEndedFun(this, event);
        }
        this.inCd = true;
        this.cdCount = 0;
    }

    private onTouchCancel(event?: EventTouch) {
        if (!this._interactable || !this.enabledInHierarchy) {
            return;
        }
        this._pressed = false;
        this._state = ButtonState.NORMAL;
        this.updateState();
        if (this.touchCancelFun) {
            this.touchCancelFun(this, event);
        }
    }

    protected addToStage() {
        this.node.on(NodeEventType.TOUCH_START, this.onTouchBegan, this);
        this.node.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(NodeEventType.TOUCH_END, this.onTouchEnded, this);
        this.node.on(NodeEventType.TOUCH_CANCEL, this.onTouchCancel, this);

        // this.node.on(NodeEventType.MOUSE_ENTER, this.onMouseMoveIn, this);
        // this.node.on(NodeEventType.MOUSE_LEAVE, this.onMouseMoveOut, this);
    }

    protected removeFromStage() {
        this.node.off(NodeEventType.TOUCH_START, this.onTouchBegan, this);
        this.node.off(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(NodeEventType.TOUCH_END, this.onTouchEnded, this);
        this.node.off(NodeEventType.TOUCH_CANCEL, this.onTouchCancel, this);

        // this.node.off(NodeEventType.MOUSE_ENTER, this.onMouseMoveIn, this);
        // this.node.off(NodeEventType.MOUSE_LEAVE, this.onMouseMoveOut, this);
    }
}