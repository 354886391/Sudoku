import { _decorator, Node, Component, Animation  } from "cc";
import { UIManager } from "../../../../script/framework/ui/UIManager";
import { UIView } from "../../../../script/framework/ui/UIView";

const { ccclass, property } = _decorator;

@ccclass
export class LoadNotice extends UIView {

    @property(Animation)
    loadAnim: Animation = null;

    callback: Function = null;

    public init(callback: Function): void {
        Log.w("LoadNotice init");
        this.callback = callback;
    }

    protected start(): void {
        this.loadAnim.play();
    }

    public onClose(): void {
        Log.w("LoadNotice onClose");
    }
}

UIManager.instance.register(LoadNotice);