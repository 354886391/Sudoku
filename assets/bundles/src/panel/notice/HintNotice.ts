import { _decorator, Node, Component, Animation, Label, animation } from "cc";
import { UIManager } from "../../../../script/framework/ui/UIManager";
import { UIView } from "../../../../script/framework/ui/UIView";

const { ccclass, property } = _decorator;

@ccclass
export class HintNotice extends UIView {

    @property(Animation)
    public hintAnim: Animation = null;
    @property(Label)
    public content: Label = null;

    text: string = "";

    public init(text: string): void {
        Log.w("HintNotice init");
        this.text = text;
    }

    protected start(): void {
        this.content.string = this.text;
        this.hintAnim.play();
        this.hintAnim.once(Animation.EventType.FINISHED, () => {
            this.onCloseClick();
        });
    }

    public onCloseClick(): void {
        UIManager.instance.close(HintNotice);
    }
}

UIManager.instance.register(HintNotice);