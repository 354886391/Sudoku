import { _decorator, Component, Node } from 'cc';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GobeEvents } from '../../../script/network/GobeEvents';
import { GobeManager } from '../../../script/network/GobeManager';
import { PlayerData } from '../data/PlayerData';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { SelectPanel } from '../panel/SelectPanel';
import { HintDialog } from '../panel/dialog/HintDialog';
import { ReadyGoPanel } from '../panel/ReadyGoPanel';
import { GameEvents } from '../data/GameEvent';
import { PlayerInfo } from '../../../script/libs/GOBE';
import { Channel, GameState, Player } from '../data/GameState';

const { ccclass, property } = _decorator;

@ccclass
export class GameManager extends Component {


    gameState: GameState = null;

    protected onEnable(): void {
        Eventer.on(GobeEvents.ON_GAME_READY, this.onGameReady, this);
        Eventer.on(GobeEvents.ON_GAME_321, this.onGame321, this)
        Eventer.on(GobeEvents.ON_GAME_START, this.onGameStart, this);
        Eventer.on(GobeEvents.ON_GAME_END, this.onGameEnd, this);
    }

    protected onDisable(): void {
        Eventer.offHandler(GobeEvents.ON_GAME_READY, this.onGameReady);
        Eventer.offHandler(GobeEvents.ON_GAME_321, this.onGame321)
        Eventer.offHandler(GobeEvents.ON_GAME_START, this.onGameStart);
        Eventer.offHandler(GobeEvents.ON_GAME_END, this.onGameEnd);
    }

    protected start(): void {
        this.loginGame();
        Eventer.on(GameEvents.Show_ReadyGo, this.showReadyGo.bind(this));
    }
    loginGame() {
        // 登录
        let playerId = PlayerData.instance.playerInfo.pid;
        GobeManager.instance.initSDK(playerId, (successInit: boolean) => {
            if (successInit) {
                // 登录成功
                UIManager.instance.open(SelectPanel);
            } else {
                // 登录失败
                UIManager.instance.open(HintDialog, "登录失败");
            }
        });
    }

    showReadyGo() {
        // ready GO
        UIManager.instance.open(ReadyGoPanel, () => {
            GobeManager.instance.startGame();
        });
    }

    /**
    * 收到房间信息
    */
    private onGetRoomInfo() {
        let playerList: PlayerInfo[] = GobeManager.instance.roomPlayers;
        let players: Array<Player> = this.gameState.players;
        playerList.forEach((value: PlayerInfo, index: number) => {
            var pIndex: number = 0;
            if (!GobeManager.instance.checkIsRoomOwner(value.playerId)) {
                pIndex = 1;
            }
            let player: Player = players[pIndex];
            if (!player.channel) player.channel = {} as Channel;
            player.channel.openId = value.playerId;
            player.channel.name = value.customPlayerProperties as string;
            player.channel.state = value.customPlayerStatus as number;
            player.channel.delayTime = 0;
        });

        Eventer.emit(GobeEvents.ON_GAME_READY);
    }

    onGameReady() {
        let gameState: GameState = this.gameState;
        let players: Array<Player> = gameState.players;
        players.forEach((value: Player, index: number) => {
            if (value.channel) {
                let playerPath = "player/girl";
                if (GobeManager.instance.checkIsRoomOwner(value.channel.openId)) {
                    playerPath = "player/boy";
                }
            }
        });
    }

    onGame321() {

    }

    onGameStart() {

    }

    onGameEnd() {

    }


}


