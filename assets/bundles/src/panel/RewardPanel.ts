import { _decorator, Node, Component, Animation } from "cc";
import { UIManager } from "../../../script/framework/ui/UIManager";
import { UIView } from "../../../script/framework/ui/UIView";
import { GobeManager, WIFI_TYPE } from "../../../script/network/GobeManager";
import { HintDialog } from "./dialog/HintDialog";
import { ReadyPanel } from "./ReadyPanel";
import { LoadNotice } from "./notice/LoadNotice";
import { SelectPanel } from "./SelectPanel";

const { ccclass, property } = _decorator;

@ccclass
export class RewardPanel extends UIView {

    @property(Animation)
    rewardAnim: Animation = null;

    callback: Function = null;

    public init(winner: number, callback: Function): void {
        Log.w("RewardPanel init");
        this.callback = callback;
    }

    protected start(): void {
        this.rewardAnim.play();
        GobeManager.instance.leaveRoom();
    }

    public onLevelClick(): void {
        GobeManager.instance.leaveGame();
        UIManager.instance.close(RewardPanel);
    }

    public onAgainClick(): void {
        UIManager.instance.open(LoadNotice);
        if (GobeManager.instance.wifiType == WIFI_TYPE.WIFI) {
            GobeManager.instance.matchRoom(() => {
                // ready
                this.showReady();
            }, () => {
                UIManager.instance.open(HintDialog, "房间匹配失败");
            });
        } else {
            GobeManager.instance.createRoomAI(() => {
                // ready
                this.showReady();
            }, () => {
                UIManager.instance.open(HintDialog, "房间创建失败");
            });
        }
    }

    showReady() {
        // ready
        UIManager.instance.open(ReadyPanel);
        UIManager.instance.close(LoadNotice);
        UIManager.instance.close(SelectPanel);
    }

}

UIManager.instance.register(RewardPanel);