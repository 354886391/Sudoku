import { _decorator, Node, Component, Animation, Label, Sprite, SpriteFrame, find } from "cc";
import { UIManager } from "../../../script/framework/ui/UIManager";
import { UIView } from "../../../script/framework/ui/UIView";
import { Global } from "../../../script/Global";
import { Eventer } from "../../../script/framework/tool/Eventer";
import { GobeEvents } from "../../../script/network/GobeEvents";
import { HintNotice } from "./notice/HintNotice";
import { GameEvents } from "../data/GameEvent";
import { UIButton } from "../../../script/framework/ui/group/UIButton";
import { SelectPanel } from "./SelectPanel";
import { NetworkManager } from "../network/NetworkManager";

const { ccclass, property } = _decorator;

@ccclass
export class ReadyPanel extends UIView {

    @property(Animation)
    readyAnim: Animation = null;
    @property(Animation)
    vsAnim: Animation = null;
    @property(Label)
    txtNum: Label = null;
    @property(UIButton)
    closeBtn: UIButton = null;

    @property([Node])
    playerWaitList: Node[] = [];
    @property([Node])
    playerHeadList: Node[] = [];

    isShowVs: boolean = false;
    isFightOpen: boolean = false;


    callback: Function = null;

    public init(isFight: boolean = false, callback: Function): void {
        Log.w("ReadyPanel init");
        this.isShowVs = false;
        this.isFightOpen = isFight;
        this.callback = callback;
    }

    protected onLoad(): void {
        this.vsAnim.node.active = false;
        this.readyAnim.node.active = false;
        this.closeBtn.touchEndedFun = this.onCloseClick.bind(this);
        Eventer.on(GobeEvents.ON_OTHER_JOIN_ROOM, this.onOtherJoinRoom, this);
        this.readyAnim.once(Animation.EventType.FINISHED, () => {
            this.isShowVs = true;
            this.updateShowPlayer();
            this.checkStart();
        });
        this.vsAnim.once(Animation.EventType.FINISHED, () => {
            Eventer.emit(GameEvents.ON_SHOW_READYGO);
        });
    }

    protected start(): void {
        this.txtNum.string = "房间号：" + NetworkManager.instance.roomCode;
        for (let i = 0; i < this.playerHeadList.length; i++) {
            this.showReadyPlayer(i, i == 0);    // 默认房主已准备
        }
        this.readyAnim.node.active = true;
        this.readyAnim.play();
    }

    onOtherJoinRoom(playerId: string) {
        this.updateShowPlayer(playerId);
        this.checkStart();
    }

    showReadyPlayer(index: number, isReady: boolean, playerName: string = "") {
        this.playerWaitList[index].active = !isReady;
        this.playerHeadList[index].active = isReady;
        if (playerName != "") {
            find("name", this.playerHeadList[index]).getComponent(Label).string = playerName;
        }
    }

    updateShowPlayer(playerId?: string) {
        let roomPlayers = NetworkManager.instance.roomPlayers;
        for (let i = 0; i < roomPlayers.length; i++) {
            let player = roomPlayers[i];
            if (playerId && playerId == player.playerId) {
                this.showReadyPlayer(i, true, player.customPlayerProperties);
            }
        }
    }

    checkStart() {
        if (!this.isShowVs) return;
        let roomPlayers = NetworkManager.instance.roomPlayers;
        if (roomPlayers.length >= Global.MAX_PLAYER) {
            this.vsAnim.node.active = true;
            this.vsAnim.play();
        }
    }

    public onCloseClick(): void {
        NetworkManager.instance.leaveRoom(() => {
            UIManager.instance.open(HintNotice, "退出房间");
            UIManager.instance.open(SelectPanel);
        });
        this.callback && this.callback();
        UIManager.instance.close(ReadyPanel);
    }
}

UIManager.instance.register(ReadyPanel);