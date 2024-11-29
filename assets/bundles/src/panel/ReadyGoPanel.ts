import { _decorator, Node, Component, Animation } from "cc";
import { UIManager } from "../../../script/framework/ui/UIManager";
import { UIView } from "../../../script/framework/ui/UIView";

const { ccclass, property } = _decorator;

@ccclass
export class ReadyGoPanel extends UIView {

    @property(Animation)
    countDownAnim: Animation = null;

    callback: Function = null;

    public init(callback: Function): void {
        Log.w("ReadyGoPanel init");
        this.callback = callback;
    }

    protected start(): void {
        this.countDownAnim.play();
        this.countDownAnim.once(Animation.EventType.FINISHED, () => {
            this.callback && this.callback();
        });
    }
}

UIManager.instance.register(ReadyGoPanel);