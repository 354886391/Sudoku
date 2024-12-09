import { _decorator, Node, Component } from "cc";
import { UIManager } from "../../../script/framework/ui/UIManager";
import { UIView } from "../../../script/framework/ui/UIView";
import { UIButton } from "../../../script/framework/ui/group/UIButton";
import { ReadyPanel } from "./ReadyPanel";
import { HintDialog } from "./dialog/HintDialog";
import { LoadNotice } from "./notice/LoadNotice";
import { Eventer } from "../../../script/framework/tool/Eventer";
import { GobeEvents } from "../../../script/network/GobeEvents";
import { GobeManager } from "../../../script/network/GobeManager";

const { ccclass, property } = _decorator;

@ccclass
export class SelectPanel extends UIView {

    @property(UIButton)
    createRoomAIBtn: UIButton = null;
    @property(UIButton)
    createRoomBtn: UIButton = null;
    @property(UIButton)
    matchRoomBtn: UIButton = null;

    public init(): void {
        Log.w("SelectPanel init");

        this.createRoomAIBtn.touchEndedFun = this.onCreateRoomAIClick.bind(this);   // 人机
        this.createRoomBtn.touchEndedFun = this.onCreateRoomClick.bind(this);       // 创建
        this.matchRoomBtn.touchEndedFun = this.onMatchRoomClick.bind(this);         // 匹配
    }

    /** 创建人机房间 */
    public onCreateRoomAIClick(): void {
        Log.d("SelectPanel--> onCreateRoomAIClick");
        GobeManager.instance.createRoomAI(() => {
            GobeManager.instance.startGame();
        });
    }

    /** 创建房间 */
    public onCreateRoomClick(): void {
        Log.d("SelectPanel--> onCreateRoomClick");
        UIManager.instance.open(LoadNotice);
        GobeManager.instance.createRoom(() => {
            this.showReady();
            Eventer.emit(GobeEvents.ON_GAME_READY);
        });
    }

    /** 匹配房间 */
    public onMatchRoomClick(): void {
        Log.d("SelectPanel--> onMatchRoomClick");
        UIManager.instance.open(LoadNotice);
        GobeManager.instance.matchRoom(() => {
           this.showReady();
           Eventer.emit(GobeEvents.ON_GAME_READY);
        });
    }

    showReady() {
        UIManager.instance.open(ReadyPanel);
        UIManager.instance.close(LoadNotice);
        UIManager.instance.close(SelectPanel);
    }
}
UIManager.instance.register(SelectPanel);