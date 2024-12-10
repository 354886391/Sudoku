import { Asset, EmptyDevice, resources, sys } from "cc";
import { FrameInfo, FramePlayerInfo, PlayerInfo, RecvFrameMessage, RecvFromServerInfo, RoomInfo, UpdateCustomPropertiesResponse, UpdateCustomStatusResponse } from "../libs/GOBE";
import { Eventer } from "../framework/tool/Eventer";
import { Singleton } from "../framework/util/Singleton";
import { GobeEvents } from "./GobeEvents";
import { Global } from "../Global";
import { PlayerData } from "../../bundles/src/data/PlayerData";
import { Util } from "../framework/util/Util";
import { GameState } from "../../bundles/src/data/GameState";

export enum LOGIN_TYPE {
    /** 游客 */
    Guest,
    /** 账号 */
    Account,
}

export enum ROOM_TYPE {
    NONE = "none",
    READY = "ready",
    START = "start",
    END = "end"
}

export enum WIFI_TYPE {
    STAND_ALONE = "stand-alone", // 单机模式
    WIFI = "wifi", // 联网模式
}

export interface CustomServerMsg {
    playerId?: string,
    status?: string,
    board?: string,
    time?: number,
}

export interface CustomRoomProp {
    curFrameId?: number;
    type: ROOM_TYPE;
    board?: string;
    time: number;
    serverTimeDis?: number;
}

export interface AloneRoomInfo {
    ownerId: string;
    roomCode: string;
    players: PlayerInfo[];
    customRoomProperties: string;
}

// 设置SDK日志打印级别
window.GOBE.Logger.level = window.GOBE.LogLevel.INFO;

export class GobeManager extends Singleton<GobeManager>() {

    // 房间
    private _room: GOBE.Room = null;
    private _roomAlone: AloneRoomInfo = null;
    // 玩家自己
    private _player: GOBE.Player = null;
    private _client: GOBE.Client = null;
    /** 接收的帧数据 key: frameId, value: FrameInfo[] */
    private _recvMap: Map<number, FrameInfo[]>;
    // 房间状态
    private _roomType: ROOM_TYPE = ROOM_TYPE.NONE;
    // 网络模式
    private _wifiType: WIFI_TYPE = WIFI_TYPE.WIFI;
    // 原生平台证书url
    private _cacertNativeUrl: string = "";

    private _isAi: boolean = false;
    private _isRoomOwnIn: boolean = false;      // 房主有没有加入房间
    private _isConnected: boolean = false;      // 长链是否是连接状态，默认false
    private _isStartGame: boolean = false;
    private _isOtherStartGame: boolean = false;
    private _isStartFrameSync: boolean = false;

    private _openId: string = null;             // 玩家自定义Id
    private _playerId: string = null;           // 玩家Id
    private _lastRoomId: string = null;         // 上次登录房间Id

    private _time: number = 0;
    private _currFrame: number = 0;
    private _serverTimeDis: number = 0;         // 服务器与客户端时间间隔

    public get isNetwork() {
        return this._wifiType == WIFI_TYPE.WIFI;
    }

    /** 判断是否初始化 */
    public get isInitd() {
        // 初始化成功后才有玩家Id
        return !!this._playerId;
    }

    public get time(): number {
        return this.isNetwork ? this._time : nowTime();
    }

    public get currFrame(): number {
        return this._currFrame;
    }

    /** 服务器与客户端时间间隔 */
    public get serverTimeDis(): number {
        return this._serverTimeDis;
    }

    /** 接收的帧数据字典
     * @param key frameId, 
     * @param value FrameInfo[] */
    public get recvMap() {
        return this._recvMap;
    }

    /** 房间号 */
    public get roomCode(): string {
        return this.isNetwork ? this._room.roomCode : this._roomAlone.roomCode;
    }

    /** 房间内的玩家列表 */
    public get roomPlayers(): PlayerInfo[] {
        return this.isNetwork ? this._room.players : this._roomAlone.players;
    }

    /** 检查是否为玩家自己 */
    public isOwnPlayer(playerId: string) {
        return this._playerId == playerId;
    }

    /** 检查自己是否为房主 */
    public isRoomOwner() {
        return this._room && this._room.ownerId == this._playerId;
    }

    /** 检查是否为房主 */
    public isRoomOwnerBy(id: string) {
        return this._room && this._room.ownerId == id;
    }

    /** 初始化SDK */
    public initSDK(openId: string, callback: (success: boolean) => void) {
        if (this.isInitd) {
            callback(true);
            return LogEX.warn("SDK 已经初始化，无需重复操作");
        }
        this._openId = openId;
        this.getToken(callback);
    }

    /** 获取Token */
    private getToken(callback: (success: boolean) => void) {
        let url: string = "https://connect-drcn.hispace.hicloud.com/agc/apigw/oauth2/v1/token";
        // 初始化一个 XMLHttpRequest 实例对象。
        const xhr = new XMLHttpRequest();
        // 初始化一个请求
        xhr.open("post", url, true);
        // 设置 HTTP 请求标头的值。必须在 open() 之后、send() 之前调用 setRequestHeader() 方法。
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        // 请求成功完成时触发 (status为200)
        xhr.onload = () => {
            if (xhr.status !== 200) {
                return;
            }
            let info = JSON.parse(xhr.response);
            this.initGobe(info["access_token"], callback);
        };
        // 发送数据
        let data = {
            'client_id': Global.CLIENT_ID,
            'client_secret': Global.CLIENT_SECRET,
            'grant_type': 'client_credentials',
            'useJwt': 0
        }
        // 发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。
        xhr.send(JSON.stringify(data));
    }

    /** 获取证书url */
    private loadCert(token: string, callback: (success: boolean) => void) {
        resources.load("/endpoint-cert", Asset, (error, asset) => {
            if (error) {
                LogEX.error("loadCert: 加载证书失败" + error);
                return;
            }
            this._cacertNativeUrl = asset.nativeUrl;
            this.initGobe(token, callback);
        })
    }

    /** 初始化GOBE */
    private initGobe(token: string, callback: (success: boolean) => void) {
        let clientConfig = {
            appId: Global.APP_ID,                  // 应用ID
            openId: this._openId,                        // 玩家ID，区别不同用户
            clientId: Global.CLIENT_ID,            // 客户端ID
            clientSecret: Global.CLIENT_SECRET,    // 客户端密钥
            accessToken: token,                    // AGC接入凭证(推荐)
            appVersion: '1.10.111',
        }
        // 初始化 client
        if (sys.Platform.ANDROID == sys.platform) {
            if (this._cacertNativeUrl == "") {
                this.loadCert(token, callback);
                return;
            }
            clientConfig = Object.assign(clientConfig, {
                platform: window.GOBE.PlatformType.ANDROID,
                cerPath: this._cacertNativeUrl,
            })
        }
        this._client = new window.GOBE.Client(clientConfig);
        // 监听Client.init方法的返回结果
        this._client.onInitResult(this.onInitResult.bind(this));
        // 调用Client.init方法进行初始化
        this._client.init().then(client => {
            this._playerId = client.playerId;
            this._lastRoomId = client.lastRoomId;
            this._serverTimeDis = client.loginTimestamp - nowTime();
            callback && callback(true);
        }).catch(error => {
            LogEX.error("initGobe--> client init fail: ", error);
            callback && callback(false);
        })
    }

    /** 初始化监听回调 */
    private onInitResult(resultCode: number) {
        if (resultCode == window.GOBE.ErrorCode.COMMON_OK) {
            // 如果有上次登录的房间
            if (this._lastRoomId) {
                LogEX.info("onInitResult-->  lastRoomId: ", this._lastRoomId);
                // 自动加入房间
                this.joinRoom(this._lastRoomId, () => {
                    LogEX.info("joinRoom-->  customRoomProperties: ", this._room.customRoomProperties);
                    let roomProp = JSON.parse(this._room.customRoomProperties) as CustomRoomProp;
                    // 重置房间起始帧Id
                    if (roomProp.curFrameId) {
                        this._room.resetRoomFrameId(roomProp.curFrameId);
                    }
                    // 游戏未开始或游戏已结束, 退出房间
                    if (roomProp.type == ROOM_TYPE.READY || roomProp.type == ROOM_TYPE.END) {
                        LogEX.log("joinRoom-->  游戏未开始或游戏已结束, 退出房间");
                        this.leaveRoom();
                        this._lastRoomId = null;
                    } else {
                        let time = roomProp.time;
                        let remainTime = Math.floor(Global.GAME_TIME - (nowTime() - time + this._serverTimeDis) / 1000); // 游戏剩余时间s
                        if (remainTime > 5) {
                            // 游戏时间内, 重新进入房间                               
                            LogEX.log("joinRoom 重新进入房间");
                        } else {
                            // 超过游戏时间, 退出房间
                            LogEX.log("joinRoom 超过游戏时间, 退出房间");
                            this.leaveRoom();
                            this._lastRoomId = null;
                        }
                    }
                });
            } else {
                this._roomType = ROOM_TYPE.NONE;
            }
            LogEX.info("onInitResult-->  init success");
        } else {
            LogEX.error("onInitResult-->  init failed: ", resultCode);
        }
    }

    private joinRoom(roomId: string, callback: Function) {
        LogEX.info("joinRoom-->  加入房间: ", roomId);
        this._isAi = false;
        this._currFrame = 0;
        this._recvMap = new Map();
        this._wifiType = WIFI_TYPE.WIFI;
        let playerConfig = {
            customPlayerStatus: 0,
            customPlayerProperties: PlayerData.instance.playerInfo.name,  // todo: 玩家属性
        };
        this._client.joinRoom(roomId, playerConfig).then(room => {
            this._room = room;
            this._player = room.player;
            this._lastRoomId = room.roomId;
            this.enabledEventRoom();
            callback && callback();
        }).catch(error => {
            LogEX.error("joinRoom-->  error: ", error);
        });
    }

    public leaveRoom(callback?: Function) {
        LogEX.log("leaveRoom-->  离开房间");
        if (this._lastRoomId && this._client) {
            this._client.leaveRoom().then(client => {
                this._client = client;
                this._client.removeAllListeners();
                this._room && this._room.removeAllListeners();
                this._room = null;
                callback && callback();
            }).catch((error) => {
                LogEX.error("leaveRoom-->  error", error)
            });
        } else {
            this._roomAlone = null;
            callback && callback();
        }
    }

    /** 创建AI房间 */
    public createRoomAI(callback: Function) {
        LogEX.log("创建AI房间");
        this._isAi = true;
        this._currFrame = 0;
        this._serverTimeDis = 0;
        this._recvMap = new Map();
        this._wifiType = WIFI_TYPE.STAND_ALONE;
        let roomProp = {
            type: ROOM_TYPE.READY,
            time: 0,
        };
        this._roomAlone = {
            ownerId: this._playerId,
            roomCode: "0001" + Math.floor(Math.random() * 100),
            players: [],
            customRoomProperties: JSON.stringify(roomProp)
        };
        let playerConfig = {
            playerId: this._playerId,
            customPlayerStatus: 0,
            customPlayerProperties: PlayerData.instance.playerInfo.name,  // todo: 玩家属性
        };
        this._roomAlone.players.push(playerConfig);
        Util.randomName(1).then((name) => {
            let playerConfig = {
                playerId: "ai00000",
                customPlayerStatus: 0,
                customPlayerProperties: name,  // todo: 玩家属性
            };
            this._roomAlone.players.push(playerConfig);
        });
        this._time = 0;
        this._isStartFrameSync = true;
        this._roomType = ROOM_TYPE.READY;
        callback && callback();
    }

    /** 创建房间 */
    public createRoom(callback: Function) {
        if (!this.isInitd) {
            return LogEX.warn("请先初始化 SDK");
        }
        LogEX.log("创建房间");
        this._isAi = false;
        this._currFrame = 0;
        this._recvMap = new Map();
        this._wifiType = WIFI_TYPE.WIFI;
        let roomProp = {
            type: ROOM_TYPE.NONE,
            time: 0,
        };
        let roomConfig = {
            maxPlayers: Global.MAX_PLAYER,  // 房间最大支持人数，取值范围为[1, 100]。
            matchParams: Global.MATCH_PARAMS,
            customRoomProperties: JSON.stringify(roomProp) // todo: 房间信息
        };
        let playerConfig = {
            customPlayerStatus: 0,
            customPlayerProperties: PlayerData.instance.playerInfo.name,  // todo: 玩家属性
        };
        this._client.createRoom(roomConfig, playerConfig).then(room => {
            LogEX.log("创建房间成功");
            this._room = room;
            this._player = room.player;
            this._lastRoomId = room.roomId;
            this.enabledEventRoom();
            let roomProp = {
                type: ROOM_TYPE.READY,
                time: 0
            };
            let roomInfo = {
                customRoomProperties: JSON.stringify(roomProp)
            }
            this._room.updateRoomProperties(roomInfo);    // 更新房间自定义属性
            callback && callback();
        }).catch(error => {
            LogEX.error("创建房间失败 错误: ", error);
        })
    }

    /** 匹配房间 */
    public matchRoom(callback: Function) {
        LogEX.log("开始匹配房间");
        this._isAi = false;
        this._currFrame = 0;
        this._recvMap = new Map();
        this._wifiType = WIFI_TYPE.WIFI;
        let roomProp = {
            type: ROOM_TYPE.NONE,
            time: 0,
        };
        let roomConfig = {
            maxPlayers: Global.MAX_PLAYER,
            matchParams: Global.MATCH_PARAMS,
            customRoomProperties: JSON.stringify(roomProp)
        };
        let playerConfig = {
            customPlayerStatus: 0,
            customPlayerProperties: PlayerData.instance.playerInfo.name,  // todo: 玩家属性
        };
        this._client.matchRoom(roomConfig, playerConfig).then(room => {
            this._room = room;
            this._player = room.player;
            this._lastRoomId = room.roomId;
            // 如果加入房间 默认房主在房间里
            if (this._room.players.length == Global.MAX_PLAYER) {
                this._isRoomOwnIn = true;
            }
            this.enabledEventRoom();
            let roomProp = {
                type: ROOM_TYPE.READY,
                time: 0
            };
            let roomInfo = {
                customRoomProperties: JSON.stringify(roomProp)
            }
            this._room.updateRoomProperties(roomInfo);    // 更新房间自定义属性
            callback && callback();
        }).catch(error => {
            LogEX.error("matchRoom 匹配房间失败: ", error)
        });
    }

    /** 更新房间信息 */
    public updateRoom(callback?: Function) {
        if (this._room == null) return;
        this._room.update().then(room => {
            LogEX.info("updateRoom-->  ", room);
            this._room = room;
            callback && callback();
        }).catch(error => {
            LogEX.error("updateRoom-->  error", error);  // 获取玩家房间最新信息失败
        });
    }

    /** 发送帧数据 */
    public sendFrame(info: any) {
        if (this.isNetwork) {
            if (!this._room) return;
            LogEX.info("sendFrame: ", info);
            this._room.sendFrame(JSON.stringify(info));
        } else {
            this.recvMap.set(++this._currFrame, [{
                playerId: this._playerId,
                data: [JSON.stringify(info)],
                timestamp: 0
            }]);
        }
    }

    /** 开始游戏 */
    public startGame() {
        if (this.isNetwork) {
            let serverMsg: CustomServerMsg = {
                status: Global.START_GAME,
                playerId: this._playerId,
            }
            this._room.sendToServer(JSON.stringify(serverMsg));   // todo: 
        } else {
            this._time = nowTime();
            this._roomType = ROOM_TYPE.START;
            let roomProp = {
                type: ROOM_TYPE.START,
                time: this._time
            }
            this._roomAlone.customRoomProperties = JSON.stringify(roomProp);    // todo:
            Eventer.emit(GobeEvents.ON_GAME_START);
        }
    }

    /** 结束游戏 */
    public finishGame() {
        if (this.isNetwork) {
            if (this._room && this.isRoomOwner() || (!this._isRoomOwnIn && !this.isRoomOwner())) {
                if (this._isStartFrameSync) {
                    LogEX.log("finishGame-->  stopFrameSync");
                    this._isStartFrameSync = false;
                    this._room.stopFrameSync();
                }
                let roomProp = {
                    type: ROOM_TYPE.END,
                    time: this._time
                }
                let roomInfo = {
                    customRoomProperties: JSON.stringify(roomProp)
                }
                this._room.updateRoomProperties(roomInfo);
                if (!this._isRoomOwnIn) {
                    Eventer.emit(GobeEvents.ON_GAME_END);
                }
            }
        } else {
            this._isStartFrameSync = false;
            let roomProp = {
                type: ROOM_TYPE.END,
                time: this._time
            }
            this._roomAlone.customRoomProperties = JSON.stringify(roomProp);
            Eventer.emit(GobeEvents.ON_GAME_END);
        }
    }

    /** 离开游戏 */
    public leaveGame() {

    }

    /** 房间监听信息 */
    private enabledEventRoom() {
        this._isStartGame = false;
        this._isOtherStartGame = false;
        this._room.onJoin(this.onJoining.bind(this));
        this._room.onLeave(this.onLeaving.bind(this));
        this._room.onConnect(this.onConnect.bind(this));
        this._room.onDisconnect(this.onDisconnect.bind(this));  // 断连监听 
        // 更新自定义属性
        this._room.onUpdateCustomStatus(this.onUpdateCustomStatus.bind(this));  // 更新玩家自定义状态
        this._room.onUpdateCustomProperties(this.onUpdateCustomProperties.bind(this));  // 更新玩家自定义属性
        this._room.onRoomPropertiesChange(this.onRoomPropertiesChange.bind(this));  // 更新房间自定义属性
        // SDK 开始帧同步
        this._room.onStartFrameSync(this.onStartFrameSync.bind(this));
        this._room.onStopFrameSync(this.onStopFrameSync.bind(this));

        this._room.onRecvFrame(this.onRecvFrame.bind(this));
        this._room.onRecvFromServer(this.onRecvFromServer.bind(this));

        this._room.onRequestFrameError(this.onRequestFrameError.bind(this));    // 补帧失败回调
        this._room.onSendToServerFailed(this.onSendToServerFailed.bind(this));  // 发送消息失败回调
    }

    // ====================SDK广播====================
    private onJoining(playerInfo: FramePlayerInfo) {
        let playerId = playerInfo.playerId;
        LogEX.info(`onJoin: ownerId: ${this._room.ownerId}", playerId: "${playerId}`);
        if (this.isOwnPlayer(playerId) && this._room && this._room.customRoomProperties) {
            // 同步玩家的房间信息
            let roomProp = JSON.parse(this._room.customRoomProperties) as CustomRoomProp;
            this._time = roomProp.time;
            this._roomType = roomProp.type;
        }
        if (this.isRoomOwnerBy(playerId)) {
            this._isRoomOwnIn = true;
            Eventer.emit(GobeEvents.ON_OWNER_JOIN_ROOM, playerId);  // 房主加入房间
        } else {
            Eventer.emit(GobeEvents.ON_OTHER_JOIN_ROOM, playerId);  // 其他玩家加入房间
        }
    }

    private onLeaving(playerInfo: FramePlayerInfo) {
        let playerId = playerInfo.playerId;
        LogEX.info("onLeave: ", playerId);
        if (this.isOwnPlayer(playerId)) {
            this._room.removeAllListeners();
        } else {
            this.updateRoom();
        }
        if (this.isRoomOwnerBy(playerId)) {
            this._isRoomOwnIn = false;  // 房主离开房间
        }
    }

    private onConnect(playerInfo: FramePlayerInfo) {
        let playerId = playerInfo.playerId;
        LogEX.info("onConnect: ", playerId);
        if (this.isOwnPlayer(playerId)) {
            this._isConnected = true;
            LogEX.info("玩家在线了, playerId: ", playerId);
        } else {
            LogEX.info("其他玩家上线了, playerId: ", playerId);
        }
    }

    private async onDisconnect(playerInfo: FramePlayerInfo) {
        let playerId = playerInfo.playerId;
        LogEX.info("onDisconnect: ", playerId);
        if (this.isOwnPlayer(playerId)) {
            this._isConnected = false;  // 当前玩家断线
            if (this._room) {
                // 没有超过重连时间，就进行重连操作
                while (!this._isConnected) {
                    await sleep(1000).then();   // 1秒重连一次，防止并发过大游戏直接卡死
                    await this._room.reconnect();
                }
            }
        } else {
            this.updateRoom();
            if (this._roomType == ROOM_TYPE.READY) {
                let roomProp = {
                    type: ROOM_TYPE.END,
                    time: 0,
                }
                let roomInfo = {
                    customRoomProperties: JSON.stringify(roomProp),
                }
                this._room.updateRoomProperties(roomInfo);
                Eventer.emit(GobeEvents.ON_GAME_END);   // 游戏结束
            }
        }
        // 房主掉线
        if (this.isRoomOwnerBy(playerId)) {
            this._isRoomOwnIn = false;
        }
    }

    // 修改自定义状态回调
    onUpdateCustomStatus(playerInfo: UpdateCustomStatusResponse) {
        throw new Error("Method not implemented.");
    }

    // 修改自定义属性回调
    onUpdateCustomProperties(playerInfo: UpdateCustomPropertiesResponse) {
        throw new Error("Method not implemented.");
    }

    // 修改房间属性回调
    onRoomPropertiesChange(roomInfo: RoomInfo) {
        LogEX.info("onRoomPropertiesChange: ", roomInfo.customRoomProperties);
        let roomProp = JSON.parse(roomInfo.customRoomProperties) as CustomRoomProp;
        this._time = roomProp.time;
        this._roomType = roomProp.type;
        switch (this._roomType) {
            case ROOM_TYPE.READY:
                // Eventer.emit(GobeEvents.ON_GAME_READY);  // 游戏准备
                break;
            case ROOM_TYPE.START:
                Eventer.emit(GobeEvents.ON_GAME_START); // 游戏开始
                break;
            case ROOM_TYPE.END:
                Eventer.emit(GobeEvents.ON_GAME_END);   // 游戏结束
                break;
            default: break;
        }
        this.updateRoom();
    }

    private onStartFrameSync() {
        LogEX.log("onStartFrameSync");
        this._isStartFrameSync = true;
    }

    private onStopFrameSync() {
        LogEX.log("onStopFrameSync");
        this._isStartFrameSync = false;
        this._recvMap = new Map();
    }

    onRecvFrame(msg: RecvFrameMessage | RecvFrameMessage[]) {
        LogEX.info("onRecvFrame: ", msg);
        if (msg instanceof Array) {
            for (let i = 0; i < msg.length; i++) {
                if (msg[i].frameInfo) {
                    this._recvMap.set(msg[i].currentRoomFrameId, msg[i].frameInfo);
                }
            }
            let last = msg.length - 1;
            this._time = msg[last].time;
            this._currFrame = msg[last].currentRoomFrameId;
        } else {
            if (msg.frameInfo) {
                this._recvMap.set(msg.currentRoomFrameId, msg.frameInfo);
            }
            this._time = msg.time;
            this._currFrame = msg.currentRoomFrameId;
        }
    }

    private onRequestFrameError(onRequestFrameError: any) {
        throw new Error("Method not implemented.");
    }

    private onSendToServerFailed(error: any) {
        LogEX.error("onSendToServerFailed: ", error);
    }

    // 接收实时服务器消息
    private onRecvFromServer(data: RecvFromServerInfo) {
        if (data.msg) {
            let parseMsg = JSON.parse(data.msg) as CustomServerMsg;
            LogEX.info(`onRecvFromServer-->  gameStatus: ${parseMsg.status}`);
            if (parseMsg.status == Global.START_GAME) {
                if (this.isOwnPlayer(parseMsg.playerId)) {
                    this._isStartGame = true;
                } else {
                    this._isOtherStartGame = true;
                }
                LogEX.info(`onRecvFromServer-->  ownStartGame: ${this._isStartGame}, otherStartGame: ${this._isOtherStartGame}`);
                if (this.isRoomOwner()) {
                    // 房主发送开始信息
                    if (this._isStartGame && this._isOtherStartGame) {
                        let serverMsg: CustomServerMsg = {
                            status: Global.START_GAME_TIME,
                            time: nowTime(),
                            board: GameState.createBoard(),
                        }
                        this._room.sendToServer(JSON.stringify(serverMsg));
                    }
                }
            } else if (parseMsg.status == Global.START_GAME_TIME) {
                // 接受并处理牌面
                if (parseMsg.board) {
                    GameState.handleBoard(parseMsg.board);
                }
                // 开始帧同步
                if (this.isRoomOwner()) {
                    let roomProp: CustomRoomProp = {
                        type: ROOM_TYPE.START,
                        time: parseMsg.time,
                        board: parseMsg.board,
                        serverTimeDis: parseMsg.time - nowTime()
                    }
                    let roomInfo = {
                        customRoomProperties: JSON.stringify(roomProp),
                    }
                    this._room.updateRoomProperties(roomInfo);
                    this._room.startFrameSync();
                }
                this._serverTimeDis = parseMsg.time - nowTime();
            }
        }
    }
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function nowTime() {
    return new Date().getTime();
}


