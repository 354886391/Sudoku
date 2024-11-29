import { _decorator, Component, Node } from 'cc';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { Global } from '../../../script/Global';
import { PlayerInfo } from '../../../script/libs/GOBE';
import { GobeEvents } from '../../../script/network/GobeEvents';
import { GobeManager, ROOM_TYPE } from '../../../script/network/GobeManager';
import { GameEvents } from '../data/GameEvent';
import { Player, Channel, GameState } from '../data/GameState';
import { PlayerData } from '../data/PlayerData';
import { HintDialog } from '../panel/dialog/HintDialog';
import { ReadyGoPanel } from '../panel/ReadyGoPanel';
import { SelectPanel } from '../panel/SelectPanel';
import { RewardPanel } from '../panel/RewardPanel';

const { ccclass, property } = _decorator;

@ccclass
export class GameManager extends Component {

    _isGaming: boolean = false;
    _frameIndex: number = 0;
    _startGameTime: number = 0;

    get roomPlayers() {
        return GobeManager.instance.roomPlayers;
    }

    get statePlayers() {
        return GameState.players;
    }

    protected start(): void {
        this.loginGame();
    }

    protected onEnable(): void {
        Eventer.on(GobeEvents.ON_GAME_READY, this.onGameReady, this);
        Eventer.on(GameEvents.ON_SHOW_READYGO, this.onGameReadyGo, this);
        Eventer.on(GobeEvents.ON_GAME_START, this.onGameStart, this);
        Eventer.on(GobeEvents.ON_GAME_END, this.onGameEnd, this);
    }

    protected onDisable(): void {
        Eventer.offHandler(GobeEvents.ON_GAME_READY, this.onGameReady);
        Eventer.offHandler(GameEvents.ON_SHOW_READYGO, this.onGameReadyGo);
        Eventer.offHandler(GobeEvents.ON_GAME_START, this.onGameStart);
        Eventer.offHandler(GobeEvents.ON_GAME_END, this.onGameEnd);
    }

    loginGame() {
        // 登录
        LogEX.level = 1;
        LogEX.log("loginGame debug: ", PlayerData.instance.playerInfo);
        LogEX.info("loginGame debug: ", PlayerData.instance.playerInfo);
        LogEX.warn("loginGame warn: ", PlayerData.instance.playerInfo);
        LogEX.error("loginGame error: ", PlayerData.instance.playerInfo);
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

    }

    initPlayer() {
        let players: Player[] = [];
        for (let i: number = 0; i < Global.MAX_PLAYER; i++) {
            let player: Player = {
                id: i,
                score: 0,
                isLead: false,
                channel: {} as Channel,
            };
            players.push(player);
        }
        return players;
    }

    /** 设置初始信息 */
    public initGameState() {
        GameState.id = 0;
        GameState.players = this.initPlayer();
        GameState.frameTime = Date.now();
        this._frameIndex = 0;
    }

    /** 收到房间信息 */
    private onGetRoomInfo() {
        this.roomPlayers.forEach((value: PlayerInfo, index: number) => {
            let pIndex = GobeManager.instance.checkIsRoomOwner(value.playerId) ? 0 : 1;
            let player: Player = this.statePlayers[pIndex];
            player.channel.openId = value.playerId;
            player.channel.name = value.customPlayerProperties as string;
            player.channel.state = value.customPlayerStatus as number;
            player.channel.delayTime = 0;
        });
        Eventer.emit(GobeEvents.ON_GAME_READY);
    }

    onGameReady() {
        Log.d("onGameReady");
        this.statePlayers.forEach((value: Player, index: number) => {
            if (value.channel) {
                let playerPath = "player/girl";
                if (GobeManager.instance.checkIsRoomOwner(value.channel.openId)) {
                    playerPath = "player/boy";
                }
            }
        });
    }

    onGameReadyGo() {
        Log.d("onGameGo");
        this.checkIsReCovery();
        // ready GO
        UIManager.instance.open(ReadyGoPanel, () => {
            this.initGameState();
            this.onGetRoomInfo();
            GobeManager.instance.startGame();
        });
    }

    public checkIsReCovery() {
        if (GobeManager.instance.isJoinDis) {
            // this._handleAction(() => {
            //     this.playerLogic.updateStateRecovery();
            // });
        }
    }

    onGameStart() {
        Log.d("onGameStart");
        this._isGaming = true;
        this._startGameTime = GobeManager.instance.time;
    }

    onGameEnd() {
        Log.d("onGameEnd");
        let winner = -1;
        if (this.statePlayers[0].score > this.statePlayers[1].score) {
            winner = 0;
        } else {
            winner = 1;
        }
        UIManager.instance.open(RewardPanel, winner);
    }

    protected lateUpdate(dt: number): void {
        if (GobeManager.instance.room && GobeManager.instance.roomType != ROOM_TYPE.START || !this._isGaming) {
            return;
        }
        this.handleAction();

        let frameTime: number = GobeManager.instance.time + GobeManager.instance.serverTimeDis;
        GameState.time = Math.floor(Global.GAME_TIME - (frameTime - this._startGameTime) / 1000);
        if (GameState.time <= 0) {
            this._isGaming = false;
            GobeManager.instance.finishGame();
        }
    }

    handleAction() {

    }

}


