import { _decorator, Node, Component, Animation  } from "cc";
import { UIManager } from "../../../../script/framework/ui/UIManager";
import { UIView } from "../../../../script/framework/ui/UIView";

const { ccclass, property } = _decorator;

@ccclass
export class HintNotice extends UIView {

    callback: Function = null;

    public init(callback: Function): void {
        Log.w("HintNotice init");
        this.callback = callback;
    }

    public onCloseClick(): void {
        this.callback && this.callback();
        UIManager.instance.close(HintNotice);
    }
}

UIManager.instance.register(HintNotice);