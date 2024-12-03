import { Asset, EmptyDevice, resources, sys } from "cc";
import { FrameInfo, PlayerInfo, Room } from "../libs/GOBE";
import { Eventer } from "../framework/tool/Eventer";
import { Singleton } from "../framework/util/Singleton";
import { GobeEvents } from "./GobeEvents";
import { Global } from "../Global";
import { PlayerData } from "../../bundles/src/data/PlayerData";
import { Util } from "../framework/util/Util";

export enum PLAYER_TYPE {
    READY = 0,
    START = 1,
    END = 2
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

export class MessageInfo {
    public playerId: string = "";
    public msg: string = "";
}

export class RoomAloneInfo {
    public ownerId: string = "";
    public roomCode: string = "";
    public players: PlayerInfo[] = [];
    public customRoomProperties: string = "";
}

// 设置SDK日志打印级别
window.GOBE.Logger.level = window.GOBE.LogLevel.INFO;

export class GobeManager extends Singleton<GobeManager>() {

    private _isAi: boolean = false;
    private _isJoinDis: boolean = false;
    private _isReadyDis: boolean = false;       // 准备过程中掉线
    private _isRoomOwnIn: boolean = false;      // 房主有没有加入房间
    private _isStartGame: boolean = false;
    private _isOtherStartGame: boolean = false;
    private _isStartFrameSync: boolean = false;

    private _time: number = 0;
    private _currFrame: number = 0;
    private _serverTimeDis: number = 0;         // 服务器与客户端时间间隔
    private _otherIntervalDis: number = 0;      // 对手掉线 倒计时 10秒 游戏结束

    // 房主Id (玩家自定义Id)
    public openId: string = null;
    public roomId: string = null;
    // 玩家Id
    public playerId: string = null;
    public lastRoomId: string = null;         // 上次登录房间Id
    public roomType: ROOM_TYPE = ROOM_TYPE.NONE;
    // 房间
    private _room: GOBE.Room = null;
    private _roomAlone: RoomAloneInfo = null;
    // 玩家自己
    private _player: GOBE.Player = null;
    private _client: GOBE.Client = null;
    /** 接收的帧数据 key: frameId, value: FrameInfo[] */
    private _recvMap: Map<number, FrameInfo[]>;
    // wifi模式
    private _wifiType: WIFI_TYPE = WIFI_TYPE.WIFI;
    // 原生平台证书url
    private _cacertNativeUrl: string = "";

    public get room() {
        if (this._wifiType == WIFI_TYPE.STAND_ALONE) {
            return this._roomAlone;
        }
        return this._room;
    }

    /** 房间内的玩家列表 */
    public get roomPlayers(): PlayerInfo[] {
        if (this._wifiType == WIFI_TYPE.STAND_ALONE) {
            return this._roomAlone.players;
        }
        if (this._room) {
            return this._room.players;
        } else {
            return [];
        }
    }

    public get isJoinDis(): boolean {
        return this._isJoinDis;
    }

    /** 服务器与客户端时间间隔 */
    public get serverTimeDis(): number {
        return this._serverTimeDis;
    }

    public get time(): number {
        if (this._wifiType == WIFI_TYPE.STAND_ALONE) {
            return new Date().getTime();
        }
        return this._time;
    }



    public get currFrame(): number {
        return this._currFrame;
    }

    public get wifiType() {
        return this._wifiType;
    }

    /** 接收的帧数据字典
     * @param key frameId, 
     * @param value FrameInfo[] */
    public get recvMap() {
        return this._recvMap;
    }

    /** 判断是否初始化 */
    public isInitd() {
        // 初始化成功后才有玩家Id
        return !!this.playerId;
    }

    /** 检查是否是玩家自己 */
    public isOwnPlayer(playerId: string) {
        return this.playerId == playerId;
    }

    public isRoomOwner() {
        return this.isOwnPlayer(this.playerId);
    }

    /** 检查是否是房主 */
    public checkIsRoomOwner(id: string) {
        if (!this._room) return false;
        return this._room.ownerId == id;
    }

    /** 初始化SDK */
    public initSDK(openId: string, callback: Function) {
        this.openId = openId;
        this.getToken(callback);
    }

    /** 发送帧数据 */
    public sendFrame(info: any) {
        if (this._wifiType == WIFI_TYPE.STAND_ALONE) {
            this._recvMap[++this._currFrame] = {
                playerId: this.playerId,
                data: [JSON.stringify(info)],
                timestamp: 0
            }
        } else {
            if (!this._room) return;
            LogEX.log("sendFrame: ", info);
            this._room.sendFrame(JSON.stringify(info));
        }
    }

    /** 获取Token */
    private getToken(callback: Function) {
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
    private loadCert(token: string, callback: Function) {
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
    private initGobe(token: string, callback: Function) {
        // 初始化 client
        if (sys.Platform.ANDROID == sys.platform) {
            if (this._cacertNativeUrl == "") {
                this.loadCert(token, callback);
                return;
            }
            this._client = new window.GOBE.Client({
                appId: Global.APP_ID,                  // 应用ID
                openId: this.openId,                        // 玩家ID，区别不同用户
                clientId: Global.CLIENT_ID,            // 客户端ID
                clientSecret: Global.CLIENT_SECRET,    // 客户端密钥
                accessToken: token,                         // AGC接入凭证(推荐)
                platform: window.GOBE.PlatformType.ANDROID,
                cerPath: this._cacertNativeUrl
            });
        } else {
            this._client = new window.GOBE.Client({
                appId: Global.APP_ID,                  // 应用ID
                openId: this.openId,                        // 玩家ID，区别不同用户
                clientId: Global.CLIENT_ID,            // 客户端ID
                clientSecret: Global.CLIENT_SECRET,    // 客户端密钥
                accessToken: token,                         // AGC接入凭证(推荐)
            });
        }
        // 添加数据统计
        this.statistics();
        // 监听Client.init方法的返回结果
        this._client.onInitResult(resultCode => {
            if (resultCode == 0) {
                callback && callback(true);
                // 如果有上次登录的房间
                if (this.lastRoomId) {
                    LogEX.info("initGobe-->  onInitResult: 加载上次登录房间 roomId: ", this.lastRoomId);
                    // 加入房间
                    this.joinRoom(this.lastRoomId, () => {
                        let info = JSON.parse(this._room.customRoomProperties);
                        LogEX.info("initGobe-->  joinRoom: 加载上次登录房间 customRoomProperties: ", info);
                        // 游戏未开始或游戏已结束, 退出房间
                        if (info["type"] == ROOM_TYPE.READY || info["type"] == ROOM_TYPE.END) {
                            this.leaveRoom();
                            this.lastRoomId = null!;
                        } else {
                            let time = info["time"];
                            // 游戏剩余时间s
                            let remainTime = Math.floor(Global.GAME_TIME - (new Date().getTime() - time + this._serverTimeDis) / 1000);
                            if (remainTime > 5) {
                                // 游戏时间内, 重新进入房间                               
                                setTimeout(() => {
                                    // todo: 弹窗提示 正在重新进入房间
                                }, 500);
                                this._isJoinDis = true;
                            } else {
                                // 超过游戏时间, 退出房间
                                this.leaveRoom();
                                this.lastRoomId = null!;
                            }
                        }
                    }, (error: any) => {
                        LogEX.error("initGobe-->  lastRoomId reconnect fail: ", error);
                    });
                }
            }
        });
        // 调用Client.init方法进行初始化
        this._client.init().then(client => {
            // 已完成初始化请求, 具体初始化结果通过onInitResult回调获取
            this.playerId = client.playerId;
            this.lastRoomId = this._client.lastRoomId;
            this._serverTimeDis = client.loginTimestamp - new Date().getTime();
        }).catch(error => {
            LogEX.error("initGobe-->  init始化失败: ", error);
            callback && callback(false);
        })
    }

    /** 创建房间 */
    public createRoom(callback: Function, errorCallback: Function) {
        this._currFrame = 0;
        this._recvMap = new Map();
        this._isAi = false;
        this._wifiType = WIFI_TYPE.WIFI;
        LogEX.info("createRoom--> 创建房间");
        this._client.createRoom({
            maxPlayers: Global.MAX_PLAYER,  // 房间最大支持人数，取值范围为[1, 100]。
            matchParams: Global.MATCH_PARAMS,
            customRoomProperties: JSON.stringify({ "type": ROOM_TYPE.NONE, "time": 0 }) // todo: 房间信息
        }, {
            customPlayerStatus: 0,              // 选填，自定义玩家状态。
            customPlayerProperties: PlayerData.instance.playerInfo.name,      // todo: 选填，自定义玩家属性，最大支持2048个字符。
        }).then(room => {
            this._room = room;
            this._player = room.player;
            this.lastRoomId = room.roomId;
            this.enabledEventRoom();
            LogEX.info("-----------ROOM_READY-----------");
            // 更新房间自定义属性
            this._room.updateRoomProperties({ customRoomProperties: JSON.stringify({ "type": ROOM_TYPE.READY, "time": 0 }) });  // todo: 房间信息
            callback && callback();
            LogEX.info("创建房间成功");
        }).catch(error => {
            errorCallback && errorCallback(error);
            LogEX.error("创建房间失败 错误: ", error);
        })
    }

    /** 创建AI房间 */
    public createRoomAI(callback: Function, errorCallback: Function) {
        this._isAi = true;
        this._currFrame = 0;
        this._serverTimeDis = 0;
        this._recvMap = new Map();
        this._wifiType = WIFI_TYPE.STAND_ALONE;
        LogEX.info("createRoomAI--> 创建房间");
        this._roomAlone = new RoomAloneInfo();
        this._roomAlone.ownerId = this.playerId;
        this._roomAlone.roomCode = "0001" + Math.floor(Math.random() * 100);
        this._roomAlone.players = [];
        this._roomAlone.players.push({
            playerId: this.playerId,
            customPlayerProperties: PlayerData.instance.playerInfo.name,  // todo: 自定义AI玩家属性
        });
        Util.randomName(1).then((name) => {
            this._roomAlone.players.push({
                playerId: "ai00000",
                customPlayerProperties: name,
            });
        });
        this._roomAlone.customRoomProperties = JSON.stringify({ "type": ROOM_TYPE.READY, "time": 0 });
        this._time = 0;
        this._isStartFrameSync = true;
        this.roomType = ROOM_TYPE.READY;
        callback && callback();
    }

    /** 匹配房间 */
    public matchRoom(callback: Function, errorCallback: Function) {
        this._isAi = false;
        this._currFrame = 0;
        this._recvMap = new Map();
        this._wifiType = WIFI_TYPE.WIFI;
        LogEX.info("matchRoom--> 开始匹配房间");
        this._client.matchRoom({
            maxPlayers: Global.MAX_PLAYER,
            matchParams: Global.MATCH_PARAMS,
            customRoomProperties: JSON.stringify({ "type": ROOM_TYPE.READY, "time": 0 })
        }, {
            customPlayerStatus: 0,
            customPlayerProperties: PlayerData.instance.playerInfo.name,  // todo:
        }).then((room: Room) => {
            this._room = room;
            this.lastRoomId = room.roomId;
            this.enabledEventRoom();
            // 如果加入房间 默认房主在房间里
            if (this._room.players.length == Global.MAX_PLAYER) {
                this._isRoomOwnIn = true;
            }
            callback && callback();
        }).catch((e) => {
            errorCallback && errorCallback(e);
            LogEX.error("matchRoom 匹配房间失败: ", e)
        });
    }
    /** 获取可匹配房间列表 */
    private updateAvailableRooms(callback: Function) {
        let roomsConfig = {
            offset: '0',    // 偏移量
            limit: 10,      // 单次请求获取的房间数量
            sync: true,     // 是否返回帧同步中的房间
        };
        this._client.getAvailableRooms(roomsConfig).then(info => {
            // 查询房间列表成功
            callback && callback(info);
        }).catch(error => {
            LogEX.error("查询房间列表失败: ", error);
            callback && callback(error);
        });
    }

    /** 更新房间信息 */
    public updateRoom() {
        if (!this._room) return;
        this._room.update().then((room) => {
            this._room = room;
            LogEX.info("updateRoom-->  ", room);
        }).catch((e) => {
            // 获取玩家房间最新信息失败
            LogEX.error("updateRoom-->  error", e)
        });
    }

    /** 加入房间 */
    public joinRoom(roomId: string, callback: Function, errorCallback: Function) {
        this._isAi = false;
        this._currFrame = 0;
        this._recvMap = new Map();
        this._wifiType = WIFI_TYPE.WIFI;
        LogEX.info("joinRoom-->  加入房间");
        this._client.joinRoom(roomId, {
            customPlayerStatus: 0,
            customPlayerProperties: PlayerData.instance.playerInfo.name,  // todo: 玩家属性
        }).then(room => {
            // 加入房间中
            this._room = room;
            this._player = room.player;
            this.lastRoomId = room.roomId;
            this.enabledEventRoom();
            // 如果加入房间 默认房主在房间里
            if (room.players.length == Global.MAX_PLAYER) {
                this._isRoomOwnIn = true;
            }
            callback && callback();
        }).catch(error => {
            LogEX.error("joinRoom-->  error: ", error);
            errorCallback && errorCallback(error);
        });
    }

    /** 离开房间 */
    public leaveRoom(callback?: Function, errorCallback?: Function) {
        LogEX.info("leaveRoom-->  离开房间");
        if (this._isReadyDis) {
            this._isReadyDis = false;
            if (this._room)
                this._room.sendToServer(Global.DISMISS);
        }
        if (this.lastRoomId && this._client) {
            this._client.leaveRoom().then((client) => {
                this._client = client;
                this._client.removeAllListeners();
                this._room && this._room.removeAllListeners();
                this._room = null!;
                callback && callback();
            }).catch((error) => {
                errorCallback && errorCallback(error);
                LogEX.error("leaveRoom--> error", error)
            });
        } else {
            this._roomAlone = null!;
            callback && callback();
        }
    }

    /** 房间监听信息 */
    private enabledEventRoom() {
        this._isStartGame = false;
        this._isOtherStartGame = false;
        // 加入房间
        this._room.onJoin(player => {
            // 加入房间成功, 做相关游戏逻辑处理
            LogEX.info(`enabledEventRoom-->  onJoin: ownerId: ${this._room.ownerId}", playerId: "${player.playerId}`);
            if (player.playerId != this._room.ownerId) {
                Eventer.emit(GobeEvents.ON_OTHER_JOIN_ROOM, player.playerId);
            } else {
                // 房主加入房间
                this._isRoomOwnIn = true;
            }
            if (player.playerId != this.playerId) {
                if (this._otherIntervalDis > 0) {
                    clearInterval(this._otherIntervalDis);
                    this._otherIntervalDis = 0;
                }
            }
            if (this._room && player.playerId == this.playerId && this._room.customRoomProperties) {
                let info = JSON.parse(this._room.customRoomProperties);
                this.roomType = info["type"];
                this._time = info["time"];
            }
        });
        // 加入房间失败
        this._room.onJoinFailed(error => {
            LogEX.error("enabledEventRoom-->  onJoinFailed: ", error);
        });
        // 离开房间监听
        this._room.onLeave(player => {
            LogEX.info("enabledEventRoom-->  onLeave: ", player.playerId);
            if (player.playerId != this.playerId) {
                this.updateRoom();
            } else {
                this._room.removeAllListeners();
            }
            // 房主离开房间
            if (player.playerId == this._room.ownerId) {
                this._isRoomOwnIn = false;
            }
        });

        this._room.onDisconnect(player => {
            LogEX.info("enabledEventRoom-->  onDisconnect: ", player.playerId);
            // 当前玩家断线
            if (player.playerId == this._room.playerId) {
                if (this._room) {
                    let interval = setInterval(() => {
                        LogEX.warn("enabledEventRoom-->  onDisconnect: interval ", interval);
                        if (this._room == null) {
                            clearInterval(interval);
                            return;
                        }
                        // 重连
                        this._room.reconnect().then(() => {
                            clearInterval(interval);
                        }).catch(error => {
                            LogEX.error("enabledEventRoom-->  reconnect error", error);
                        })
                    }, 1000);
                }
            } else {
                this.updateRoom();
                if (this.roomType == ROOM_TYPE.READY) {
                    let time: number = 10;
                    this._isReadyDis = true;
                    this._otherIntervalDis = setInterval(() => {
                        // todo: 显示倒计时提示
                        time--;
                        if (time <= 0) {
                            // 游戏结束
                            Eventer.emit(GobeEvents.ON_GAME_END);
                            this._room.updateRoomProperties({ customRoomProperties: JSON.stringify({ "type": ROOM_TYPE.END, "time": 0 }) });    // todo: 
                            clearInterval(this._otherIntervalDis);
                        }
                    }, 1000);
                }
            }
            // 房间掉线
            if (player.playerId == this._room.ownerId) {
                this._isRoomOwnIn = false;
            }
        });

        this._room.onRoomPropertiesChange(roomInfo => {
            LogEX.info("enabledEventRoom-->  onRoomPropertiesChange: ", roomInfo.customRoomProperties);
            let info = JSON.parse(roomInfo.customRoomProperties);
            this._time = info["time"];
            this.roomType = info["type"];
            if (this.roomType == ROOM_TYPE.START) {
                // 游戏开始
                Eventer.emit(GobeEvents.ON_GAME_START);
            } else if (this.roomType == ROOM_TYPE.END) {
                // 游戏结束
                Eventer.emit(GobeEvents.ON_GAME_END);
            } else if (this.roomType == ROOM_TYPE.READY) {
                // 游戏准备
                // Eventer.emit(GobeEvents.ON_GAME_READY);
            }
            this.updateRoom();
        });

        this._room.onStartFrameSync(() => {
            LogEX.log("enabledEventRoom-->  onStartFrameSync");
            this._isStartFrameSync = true;
        });

        this._room.onStopFrameSync(() => {
            LogEX.log("enabledEventRoom-->  onStopFrameSync");
            this._currFrame = 0;
            this._isStartFrameSync = false;
            this._recvMap = new Map();
        });

        this._room.onRecvFromServer(recvFromServerInfo => {
            LogEX.log("enabledEventRoom-->  onRecvFromServer: ", recvFromServerInfo.msg);
            let info = JSON.parse(recvFromServerInfo.msg);
            if (info) {
                if (info["msg"] == Global.START_GAME) {
                    if (info["playerId"] != this.playerId) {
                        this._isOtherStartGame = true;
                    } else {
                        this._isStartGame = true;
                    }
                    if (this._room.ownerId == this.playerId) {
                        if (this._isOtherStartGame && this._isStartGame) {
                            this._room.sendToServer(Global.START_GAME_TIME);
                        }
                    }
                } else if (info["msg"] == Global.START_GAME_TIME) {
                    this._serverTimeDis = info["time"] - new Date().getTime();
                    if (this._room.ownerId == this.playerId) {
                        this._room.startFrameSync();
                        this._room.updateRoomProperties({ customRoomProperties: JSON.stringify({ "type": ROOM_TYPE.START, "time": info["time"], "serverTimeDis": this._serverTimeDis }) });
                    }
                }
            }
        });

        this._room.onRecvFrame(msg => {
            LogEX.log("enabledEventRoom-->  onRecvFrame: ", msg);
            if (msg instanceof Array) {
                for (let i = 0; i < msg.length; i++) {
                    this._time = msg[i].time;
                    if (msg[i].frameInfo) {
                        this._recvMap.set(msg[i].currentRoomFrameId, msg[i].frameInfo);
                    }
                }
                this._currFrame = msg[msg.length - 1].currentRoomFrameId;
                Eventer.emit(GobeEvents.ON_RECV_SYNC);
            } else {
                this._time = msg.time;
                if (msg.frameInfo) {
                    this._recvMap.set(msg.currentRoomFrameId, msg.frameInfo);
                }
                this._currFrame = msg.currentRoomFrameId;
            }
        });
    }

    /** 开始游戏 */
    public startGame() {
        if (this._isJoinDis) {
            this._isJoinDis = false;
            Eventer.emit(GobeEvents.ON_GAME_START);
        } else {
            if (this._wifiType == WIFI_TYPE.STAND_ALONE) {
                this._roomAlone.customRoomProperties = JSON.stringify({ "type": ROOM_TYPE.START, "time": new Date().getTime() });    // todo:
                this.roomType = ROOM_TYPE.START;
                this._time = new Date().getTime();
                Eventer.emit(GobeEvents.ON_GAME_START);
            } else {
                if (this._room) {
                    LogEX.warn("startGame--> sendToServer");
                    this._room.sendToServer(JSON.stringify({ "msg": Global.START_GAME, "playerId": this.playerId }));   // todo: 
                }
            }
        }
    }

    /** 离开游戏 */
    public leaveGame() {
        this.playerId = "";
        this._roomAlone = null!;
        if (this._client) {
            LogEX.warn("leaveGame--> destroy");
            this._client.destroy();
            this._client = null!;
            this._room = null!;
            this.playerId = "";
            PlayerData.instance.isInit = false;
        }
    }

    /** 结束游戏 */
    public finishGame() {
        if (this._wifiType == WIFI_TYPE.STAND_ALONE) {
            this._isStartFrameSync = false;
            this._roomAlone.customRoomProperties = JSON.stringify({ "type": ROOM_TYPE.END, "time": this._time });
            Eventer.emit(GobeEvents.ON_GAME_END);
        } else {
            // // 房主是自己或(玩家不是房主)
            if (this._room && this.playerId == this._room.ownerId
                || (!this._isRoomOwnIn && this.playerId != this._room.ownerId)
            ) {
                if (this._isStartFrameSync) {
                    this._isStartFrameSync = false;
                    LogEX.warn("finishGame--> stopFrameSync");
                    this._room.stopFrameSync();
                }
                LogEX.warn("-------finishGame------")
                this._room.updateRoomProperties({ customRoomProperties: JSON.stringify({ "type": ROOM_TYPE.END, "time": this._time }) });
                if (!this._isRoomOwnIn) {
                    Eventer.emit(GobeEvents.ON_GAME_END);
                }
            }
        }
    }

    /** 数据统计 */
    private statistics() {
        let params = {
            "appType": "hwsdk",
            "reportType": "Start",
            "sdkName": "hwgobe",
            "appId": Global.APP_ID,
            "time": Date.now(),
            "version": "1.0.0_13.6.2",
        }
        fetch("https://k.cocos.org/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((response: Response) => {
            return response.text()
        }).then((value) => {
            LogEX.log(value);
        })
    }
}


