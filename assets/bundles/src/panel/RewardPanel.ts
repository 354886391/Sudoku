import { _decorator, Node, Component, Animation } from "cc";
import { UIManager } from "../../../script/framework/ui/UIManager";
import { UIView } from "../../../script/framework/ui/UIView";
import { ReadyPanel } from "./ReadyPanel";
import { LoadNotice } from "./notice/LoadNotice";
import { SelectPanel } from "./SelectPanel";
import { GameManager } from "../game/GameManager";
import { NetworkManager } from "../network/NetworkManager";

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
        NetworkManager.instance.leaveRoom();
    }

    public onLeaveClick(): void {
        if (NetworkManager.instance.isNetwork) {
            GameManager.instance.reset();
            UIManager.instance.open(SelectPanel);
            UIManager.instance.close(RewardPanel);
        }else{
            NetworkManager.instance.finishGame();
            UIManager.instance.open(SelectPanel);
            UIManager.instance.close(RewardPanel);
        }
    }

    public onAgainClick(): void {
        UIManager.instance.open(LoadNotice);
        if (NetworkManager.instance.isNetwork) {
            NetworkManager.instance.matchRoom(() => {
                this.showReady();
            });
        } else {
            NetworkManager.instance.createRoomAI(() => {
                this.showReady();
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