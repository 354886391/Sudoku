import { _decorator, Component, Node } from 'cc';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { Global } from '../../../script/Global';
import { FrameInfo, PlayerInfo } from '../../../script/libs/GOBE';
import { GobeEvents } from '../../../script/network/GobeEvents';
import { GameEvents } from '../data/GameEvent';
import { ReadyGoPanel } from '../panel/ReadyGoPanel';
import { RewardPanel } from '../panel/RewardPanel';
import { Frame, Player } from '../data/GameDefine';
import { GameState } from '../data/GameState';
import { GamePanel } from '../panel/GamePanel';
import { SelectPanel } from '../panel/SelectPanel';
import { ReadyPanel } from '../panel/ReadyPanel';
import { NetworkManager } from '../network/NetworkManager';
import { ROOM_TYPE } from '../../../script/network/GobeManager';

const { ccclass, property } = _decorator;

@ccclass
export class GameManager extends Component {

    _frameIndex: number = 0;
    _gamePanel: GamePanel = null;

    static _instance: GameManager;

    get roomPlayers() {
        return NetworkManager.instance.roomPlayers;
    }

    get statePlayers() {
        return GameState.players;
    }

    static get instance() {
        return this._instance;
    }

    protected onLoad(): void {
        GameManager._instance = this;
        this._gamePanel = this.getComponent(GamePanel);
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

    protected start(): void {
        GameState.init();
        this._gamePanel.initGame();
    }

    public reset() {
        GameState.init();
        this._gamePanel.initGame();
        this._gamePanel.initBoard();
        this._frameIndex = 0;
    }

    /** 设置房间信息 */
    private initRoomInfo() {
        this.roomPlayers.forEach((value: PlayerInfo) => {
            let pIndex = NetworkManager.instance.isRoomOwnerBy(value.playerId) ? 0 : 1;
            let player = this.statePlayers[pIndex];
            player.channel.openId = value.playerId;
            player.channel.name = value.customPlayerProperties as string;
            player.channel.state = value.customPlayerStatus as number;
            player.channel.delayTime = 0;
        });
        Eventer.emit(GobeEvents.ON_GAME_READY);
    }

    onGameReady() {
        Log.d("onGameReady");
    }

    onGameReadyGo() {
        Log.d("onGameReadyGo");
        // this.checkIsReCovery();
        this.initRoomInfo();
        UIManager.instance.open(ReadyGoPanel, () => {
            NetworkManager.instance.startGame();
            UIManager.instance.close(ReadyGoPanel);
        });
    }

    onGameStart() {
        Log.d("onGameStart");
        GameState.isGaming = true;
        GameState.startTime = NetworkManager.instance.time;
        this._gamePanel.initBoard();
        this._frameIndex = 0;

        UIManager.instance.close(ReadyPanel);
        UIManager.instance.close(ReadyGoPanel);
        UIManager.instance.close(SelectPanel);
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
        if (!GameState.isGaming) {
            return;
        }
        this.handleAction();
        let frameTime: number = NetworkManager.instance.time + NetworkManager.instance.serverTimeDis;
        GameState.remainTime = Math.floor(Global.GAME_TIME - (frameTime - GameState.startTime) / 1000);
        if (GameState.remainTime <= 0) {
            GameState.isGaming = false;
            NetworkManager.instance.finishGame();
        }
        this.updateOwnState(dt);
        this.updateOtherState(dt);

        this.checkPlayerReward();
    }

    /** 处理玩家操作 */
    handleAction(callback?: Function) {
        if (this._frameIndex > NetworkManager.instance.currFrame) {
            return;
        }
        let frames: FrameInfo[] = [];
        if (NetworkManager.instance.recvMap.has(this._frameIndex)) {
            frames = NetworkManager.instance.recvMap.get(this._frameIndex);
            this._frameIndex++;
        } else {
            this._frameIndex++;
        }
        // 遍历frames
        for (let i = 0; i < frames.length; i++) {
            let frameInfo = frames[i];
            let playerId = frameInfo.playerId;
            if (NetworkManager.instance.isNetwork) {
                let result = GameState.players.filter(player => {
                    return player.channel && player.channel.openId === playerId;
                });
                if (!result.length) return;
            }
            let frame = JSON.parse(frameInfo.data[0]) as Frame;
            if (frame) {
                Eventer.emit(GameEvents.ON_FRAME_REC, playerId, frame);
            }
        }
        callback && callback();
        this.handleAction(callback);
    }

    updateRecoveryState() {

    }

    /** 更新自身或者AI状态 */
    updateOwnState(dt: number) {

    }

    /** 更新其他玩家状态 */
    updateOtherState(dt: number) {

    }

    checkPlayerReward() {

    }

    /** 检测是否断线重连 */
    public checkIsReCovery() {
        // if (NetworkManager.instance.isJoinDis) {
        //     LogEX.warn("checkIsReCovery-->  isJoinDis: ", NetworkManager.instance.isJoinDis);
        //     this.handleAction(() => {
        //         this.updateRecoveryState();
        //     });
        // }
    }

}


