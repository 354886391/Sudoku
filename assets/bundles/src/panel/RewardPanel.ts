import { _decorator, Node, Component, Animation } from "cc";
import { UIManager } from "../../../script/framework/ui/UIManager";
import { UIView } from "../../../script/framework/ui/UIView";
import { ReadyPanel } from "./ReadyPanel";
import { LoadNotice } from "./notice/LoadNotice";
import { SelectPanel } from "./SelectPanel";
import { GameManager } from "../game/GameManager";
import { GobeManager } from "../../../script/network/GobeManager";
import { Eventer } from "../../../script/framework/tool/Eventer";
import { GobeEvents } from "../../../script/network/GobeEvents";

const { ccclass, property } = _decorator;

@ccclass
export class RewardPanel extends UIView {

    // @property(Animation)
    // rewardAnim: Animation = null;

    callback: Function = null;

    public init(winner: number, callback: Function): void {
        Log.w("RewardPanel init");
        this.callback = callback;
    }

    protected start(): void {
        // this.rewardAnim.play();
        GobeManager.instance.leaveRoom();
    }

    public onLeaveClick(): void {
        if (GobeManager.instance.isNetwork) {
            GameManager.instance.reset();
            UIManager.instance.open(SelectPanel);
            UIManager.instance.close(RewardPanel);
        }else{
            GobeManager.instance.leaveGame();
            UIManager.instance.open(SelectPanel);
            UIManager.instance.close(RewardPanel);
        }
    }

    public onAgainClick(): void {
        UIManager.instance.close(RewardPanel);
        if (GobeManager.instance.isNetwork) {
            UIManager.instance.open(LoadNotice);
            GobeManager.instance.matchRoom(() => {
                this.showReady();
                Eventer.emit(GobeEvents.ON_GAME_READY);
            });
        } else {
            GobeManager.instance.createRoomAI(() => {
                GobeManager.instance.startGame();
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