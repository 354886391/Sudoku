import { _decorator } from "cc";
import { UIManager } from "../../../script/framework/ui/UIManager";
import { UIView } from "../../../script/framework/ui/UIView";
import { UIButton } from "../../../script/framework/ui/group/UIButton";

const { ccclass, property } = _decorator;

/** 游戏开始界面 */
@ccclass
export class StartPanel extends UIView {

    @property(UIButton)
    startBtn: UIButton = null;

    callback: Function = null;

    public init(callback: Function): void {
        Log.w("StartPanel init");
        this.callback = callback;
        this.startBtn.touchEndedFun = this.onStartClick.bind(this);
    }

    public onStartClick(): void {
        this.callback && this.callback();
        UIManager.instance.close(StartPanel);
    }

}

UIManager.instance.register(StartPanel);