import { _decorator, Node, Component, Animation } from "cc";
import { UIManager } from "../../../script/framework/ui/UIManager";
import { UIView } from "../../../script/framework/ui/UIView";
import { GobeManager } from "../../../script/network/GobeManager";
import { Global } from "../../../script/Global";
import { Eventer } from "../../../script/framework/tool/Eventer";
import { GobeEvents } from "../../../script/network/GobeEvents";

const { ccclass, property } = _decorator;

@ccclass
export class ReadyPanel extends UIView {

    @property(Animation)
    readyAnim: Animation = null;
    @property(Animation)
    vsAnim: Animation = null;

    isShowVs: boolean = false;

    callback: Function = null;

    public init(callback: Function): void {
        Log.w("ReadyPanel init");
        this.isShowVs = false;
        this.callback = callback;
    }

    protected onLoad(): void {

        Eventer.on(GobeEvents.ON_OTHER_JOIN_ROOM, this.onOtherJoinRoom, this);

        this.readyAnim.node.active = true;
        this.readyAnim.play();
        this.readyAnim.once(Animation.EventType.FINISHED, () => {
            this.isShowVs = true;
            this.updateShowPlayer();
            this.checkStart();
        });
    }

    onOtherJoinRoom(playerId: string) {
        this.updateShowPlayer(playerId);
        this.checkStart();
    }

    showReadyPlayer(index: number, isReady: boolean, playerName: string = ""){

    }

    updateShowPlayer(playerId?: string){

    }

    checkStart() {
        if(!this.isShowVs) return;
        let roomPlayers = GobeManager.instance.roomPlayers;
        if(roomPlayers.length >= Global.MAX_PLAYER){
            this.readyAnim.off(Animation.EventType.FINISHED);
            this.vsAnim.node.active = true;
            this.vsAnim.play();
            this.vsAnim.once(Animation.EventType.FINISHED, () => {
                this.callback && this.callback();
                UIManager.instance.close(ReadyPanel);
            });
        }
    }

    public onCloseClick(): void {
        this.callback && this.callback();
        UIManager.instance.close(ReadyPanel);
    }
}

UIManager.instance.register(ReadyPanel);