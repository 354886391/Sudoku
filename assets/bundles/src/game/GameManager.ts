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
import { GobeManager } from '../../../script/network/GobeManager';

const { ccclass, property } = _decorator;

@ccclass
export class GameManager extends Component {

    _frameIndex: number = 0;
    _gamePanel: GamePanel = null;

    static _instance: GameManager;

    get roomPlayers() {
        return GobeManager.instance.roomPlayers;
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
        Eventer.on(GameEvents.ON_SHOW_READYGO, this.onShowReadyGo, this);
        Eventer.on(GobeEvents.ON_GAME_START, this.onGameStart, this);
        Eventer.on(GobeEvents.ON_GAME_END, this.onGameEnd, this);
    }

    protected onDisable(): void {
        Eventer.offHandler(GameEvents.ON_SHOW_READYGO, this.onShowReadyGo);
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
        this.roomPlayers.forEach((playerInfo: PlayerInfo) => {
            let pIndex = GobeManager.instance.isRoomOwnerBy(playerInfo.playerId) ? 0 : 1;
            GameState.players[pIndex].channel.openId = playerInfo.playerId;
            GameState.players[pIndex].channel.name = playerInfo.customPlayerProperties;
            GameState.players[pIndex].channel.state = playerInfo.customPlayerStatus;
            GameState.players[pIndex].channel.delayTime = 0;
        });
    }

    // 准备
    onGameReady() {
        Log.d("onGameReady");
    }

    // 倒数321
    onShowReadyGo() {
        Log.d("onGameReadyGo");
        this.initRoomInfo();
        UIManager.instance.close(ReadyPanel);
        UIManager.instance.open(ReadyGoPanel, () => {
            GobeManager.instance.startGame();
            UIManager.instance.close(ReadyGoPanel);
        });
    }

    onGameStart() {
        Log.d("onGameStart");
        GameState.isGaming = true;
        GameState.startTime = GobeManager.instance.time;
        if (!GobeManager.instance.isNetwork) {
            GameState.handleBoard();
        }
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
        if (GameState.isGaming) {
            GameState.isGaming = false;
            UIManager.instance.open(RewardPanel, winner);
        }
    }

    protected lateUpdate(dt: number): void {
        if (!GameState.isGaming) {
            return;
        }
        this.handleAction();
        let frameTime: number = GobeManager.instance.time + GobeManager.instance.serverTimeDis;
        GameState.remainTime = Math.floor(Global.GAME_TIME - (frameTime - GameState.startTime) / 1000);
        if (GameState.remainTime <= 0) {
            GameState.isGaming = false;
            GobeManager.instance.finishGame();
        }
        this.updateOwnState(dt);
        this.updateOtherState(dt);

        this.checkPlayerReward();
    }

    /** 处理玩家操作 */
    handleAction(callback?: Function) {
        if (this._frameIndex > GobeManager.instance.currFrame) {
            return;
        }
        let frames: FrameInfo[] = [];
        if (GobeManager.instance.recvMap.has(this._frameIndex)) {
            frames = GobeManager.instance.recvMap.get(this._frameIndex);
            this._frameIndex++;
        } else {
            this._frameIndex++;
        }
        // 遍历frames
        for (let i = 0; i < frames.length; i++) {
            let frameInfo = frames[i];
            let playerId = frameInfo.playerId;
            if (GobeManager.instance.isNetwork) {
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
        // if (GobeManager.instance.isJoinDis) {
        //     LogEX.warn("checkIsReCovery-->  isJoinDis: ", GobeManager.instance.isJoinDis);
        //     this.handleAction(() => {
        //         this.updateRecoveryState();
        //     });
        // }
    }

}


