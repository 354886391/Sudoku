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
import { Global } from '../../../script/Global';
import { ColorLog } from '../../../script/framework/util/ColorLog';

const { ccclass, property } = _decorator;

@ccclass
export class GameManager extends Component {


    _isGaming: boolean = false;
    _frameIndex: number = 0;
    _startGameTime: number = 0;

    protected start(): void {
        this.loginGame();
        Eventer.on(GameEvents.Show_ReadyGo, this.showReadyGo.bind(this));
    }

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

    loginGame() {
        // 登录
        ColorLog.log("loginGame");
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
            this.initGameState();
            this.onGetRoomInfo();
            GobeManager.instance.startGame();
        });
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
        let playerList = GobeManager.instance.roomPlayers;
        let gamePlayers = GameState.players;
        playerList.forEach((value: PlayerInfo, index: number) => {
            let pIndex = GobeManager.instance.checkIsRoomOwner(value.playerId) ? 0 : 1;
            let player: Player = gamePlayers[pIndex];
            player.channel.openId = value.playerId;
            player.channel.name = value.customPlayerProperties as string;
            player.channel.state = value.customPlayerStatus as number;
            player.channel.delayTime = 0;
        });
        Eventer.emit(GobeEvents.ON_GAME_READY);
    }

    /**
    * 开始帧同步操作
    */
    private _onStartGame() {
        
    }

    onGameReady() {
        Log.d("onGameReady");
        let players = GameState.players;
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
        Log.d("onGame321");
    }

    onGameStart() {
        Log.d("onGameStart");
        this._isGaming = true;
        this._startGameTime = GobeManager.instance.time;
        let players: Array<Player> = GameState.players;
    }

    onGameEnd() {
        Log.d("onGameEnd");
        if (this._isGaming) {
            this._isGaming = false;
            GobeManager.instance.finishGame();
        }
    }

}


