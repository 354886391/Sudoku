import { _decorator, Component, find, Node } from 'cc';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { Global } from '../../../script/Global';
import { FrameInfo, PlayerInfo } from '../../../script/libs/GOBE';
import { GobeEvents } from '../../../script/network/GobeEvents';
import { GobeManager, ROOM_TYPE } from '../../../script/network/GobeManager';
import { GameEvents } from '../data/GameEvent';
import { PlayerData } from '../data/PlayerData';
import { HintDialog } from '../panel/dialog/HintDialog';
import { ReadyGoPanel } from '../panel/ReadyGoPanel';
import { SelectPanel } from '../panel/SelectPanel';
import { RewardPanel } from '../panel/RewardPanel';
import { Sudoku } from '../tool/Sudoku';
import { Channel, Frame, Player } from '../data/GameData';
import { GameState } from '../data/GameState';

const { ccclass, property } = _decorator;

@ccclass
export class GameManager extends Component {

    _frameIndex: number = 0;
    _startGameTime: number = 0;

    sudoku: Sudoku = new Sudoku();

    static _instance: GameManager;

    get roomPlayers() {
        return GobeManager.instance.roomPlayers;
    }

    get statePlayers() {
        return GameState.players;
    }

    static get instance() {
        if (!this._instance) {
            this._instance = find("GamePanel").getComponent(GameManager);
        }
        return this._instance;
    }

    protected onLoad(): void {
        GameManager._instance = this;
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
        LogEX.log("loginGame-->  ", PlayerData.instance.playerInfo);
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

    init() {

    }

    reset() {
        this.initGameState();
        this.init();
    }

    /** 设置初始信息 */
    private initGameState() {
        GameState.isGaming = false;
        GameState.frameId = 0;
        GameState.players = this.initPlayer();
        GameState.frameTime = Date.now();

        this._frameIndex = 0;
    }

    private initPlayer() {
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
        // 生成牌面
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
            UIManager.instance.close(ReadyGoPanel);
            GobeManager.instance.startGame();
        });
    }

    /** 检测是否断线重连 */
    public checkIsReCovery() {
        if (GobeManager.instance.isJoinDis) {
            LogEX.warn("checkIsReCovery-->  isJoinDis: ", GobeManager.instance.isJoinDis);
            this.handleAction(() => {
                this.updateRecoveryState();
            });
        }
    }

    onGameStart() {
        Log.d("onGameStart");
        GameState.isGaming = true;
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
        if (GobeManager.instance.room && GobeManager.instance.roomType != ROOM_TYPE.START || !GameState.isGaming) {
            return;
        }
        this.handleAction();

        let frameTime: number = GobeManager.instance.time + GobeManager.instance.serverTimeDis;
        GameState.remainTime = Math.floor(Global.GAME_TIME - (frameTime - this._startGameTime) / 1000);
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
            let result = GameState.players.filter((player: Player) => {
                return player.channel && player.channel.openId === playerId;
            });
            if (!result.length) return;
            let frame = JSON.parse(frameInfo.data[0]) as Frame;
            if (frame) {
                if (frame.blockId) {
                    Eventer.emit(GameEvents.ON_BLOCK_FRAME, frame.blockId);
                }
                if (frame.optionId) {
                    Eventer.emit(GameEvents.ON_OPTION_FRAME, frame.optionId);
                }
                if (frame.board) {
                    Eventer.emit(GameEvents.ON_BOARD_FRAME, frame.board);
                }
                if (frame.steps) {
                    Eventer.emit(GameEvents.ON_STEPS_FRAME, frame.steps);
                }
            }
        }
        if (callback) {
            callback();
        }
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

}


