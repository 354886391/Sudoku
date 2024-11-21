import { Asset, EmptyDevice, resources, sys } from "cc";
import GOBE, { FrameInfo, PlayerInfo, Room } from "../../libs/GOBE";
import { Eventer } from "../framework/tool/Eventer";
import { Singleton } from "../framework/util/Singleton";
import { Global } from "../Global";
import { GobeEvents } from "./GobeEvents";


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

export class RoomAloneInfo {
    public ownerId: string = "";
    public roomCode: string = "";
    public players: PlayerInfo[] = [];
    public customRoomProperties: string = "";
}

// 设置SDK日志打印级别
window.GOBE.Logger.level = window.GOBE.LogLevel.INFO;

export class GobeManager extends Singleton<GobeManager>() {

    private static CLIENT_ID: string = '1247079560185433024'; // 需要手动修改
    private static CLIENT_SECRET: string = 'C7731F7C3530A0B355550A8339841584B4172B75F536BADEFA7ED7C3F72BF67E'; // 需要手动修改
    private static APP_ID: string = '172249065902717087'; // 需要手动修改

    // 房主Id (玩家自定义Id)
    public openId: string = null;
    // 玩家Id
    public playerId: string = null;

    // 原生平台证书url
    private _cacertNativeUrl: string = "";
    private _currFrame: number = 0;
    private _isAi: boolean = false;

    private _isRoomOwnIn: boolean = false;      // 房主有没有加入房间
    private _isJoinDis: boolean = false;
    private _isReadyDis: boolean = false;       // 准备过程中掉线

    private _isStartGame: boolean = false;
    private _isOtherStartGame: boolean = false;
    private _isStartFrameSync: boolean = false;

    private _time: number = 0;
    private _serverTimeDis: number = 0;         // 服务器与客户端时间间隔
    private _otherIntervalDis: number = 0;      // 对手掉线 倒计时 10秒 游戏结束
    // 房间
    public room: GOBE.Room = null;
    private _roomType: ROOM_TYPE = ROOM_TYPE.NONE;
    private _roomAloneInfo: RoomAloneInfo = null;
    private _lastRoomId: string = null;         // 上次登录房间Id
    // 玩家自己
    public player: GOBE.Player = null;
    private _client: GOBE.Client = null;

    // wifi模式
    private _wifiType: WIFI_TYPE = WIFI_TYPE.WIFI;
    /** 接收的帧数据 key: frameId, value: FrameInfo[] */
    private _recvMap: Map<number, FrameInfo[]>;

    public get time(): number {
        if (this._wifiType == WIFI_TYPE.STAND_ALONE) {
            return new Date().getTime();
        }
        return this._time;
    }

    public get currFrame(): number {
        return this._currFrame;
    }

    public get isJoinDis(): boolean {
        return this._isJoinDis;
    }

    /** 房间内的玩家列表 */
    public get roomPlayers(): PlayerInfo[] {
        if (this._wifiType == WIFI_TYPE.STAND_ALONE) {
            this._roomAloneInfo.players;
        }
        if (this.room) {
            return this.room.players;
        }
        else {
            return [];
        }
    }

    /** 接收的帧数据字典
     * @param key frameId, 
     * @param value FrameInfo[] */
    public get recvMap() {
        return this._recvMap;
    }

    /** 初始化SDK */
    public initSDK(openId: string, callback: Function) {
        this.openId = openId;
        this.getToken(callback);
    }

    /** 检查是否是房主 */
    public checkIsRoomOwner(id: string) {
        if (!this.room) return false;
        return this.room.ownerId == id;
    }

    /** 检查是否是玩家自己 */
    public isOwnPlayer(playerId: string) {
        return this.playerId == playerId;
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
            if (!this.room) return;
            console.log("sendFrame: ", info);
            this.room.sendFrame(JSON.stringify(info));
        }
    }

    /** 获取Token */
    private getToken(callback: Function) {
        let url: string = "https://connect-drcn.hispace.hicloud.com/agc/apigw/oauth2/v1/token";
        const xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.onload = () => {
            if (xhr.status !== 200) {
                return;
            }
            console.log("getToken->onLoad ", xhr.response);
            let info = JSON.parse(xhr.response);
            this.initGobe(info["access_token"], callback);
        };
        let data = {
            'client_id': GobeManager.CLIENT_ID,
            'client_secret': GobeManager.CLIENT_SECRET,
            'grant_type': 'client_credentials',
            'useJwt': 0
        }
        xhr.send(JSON.stringify(data));
    }

    /** 获取证书url */
    private loadCert(token: string, callback: Function) {
        console.log("loadCert->加载证书 token: " + token);
        resources.load("", Asset, (error, asset) => {

            if (error) {
                console.log("loadCert: 加载证书失败" + error);
                return;
            }
            this._cacertNativeUrl = asset.nativeUrl;
            this.initGobe(token, callback);
        })
    }

    /** 初始化GOBE */
    private initGobe(token: string, callback: Function) {
        if (sys.Platform.ANDROID == sys.platform) {
            if (this._cacertNativeUrl == "") {
                this.loadCert(token, callback);
                return;
            }
            console.log("initGobe ANDROID", token);
            this._client = new GOBE.Client({
                appId: GobeManager.APP_ID,  // 应用ID
                openId: this.openId,        // 玩家ID，区别不同用户
                clientId: GobeManager.CLIENT_ID, // 客户端ID
                clientSecret: GobeManager.CLIENT_SECRET, // 客户端密钥
                accessToken: token,         // AGC接入凭证(推荐)
                platform: GOBE.PlatformType.OTHERS,
                cerPath: this._cacertNativeUrl
            });
        } else {
            console.log("initGobe Platform.OTHERS", token);
            this._client = new GOBE.Client({
                appId: GobeManager.APP_ID, // 应用ID
                openId: this.openId, // 玩家ID，区别不同用户
                clientId: GobeManager.CLIENT_ID, // 客户端ID
                clientSecret: GobeManager.CLIENT_SECRET, // 客户端密钥
                accessToken: token, // AGC接入凭证(推荐)
            });
        }
        // 监听init方法 返回结果
        this._client.onInitResult(resultCode => {
            console.log("initGobe-> onInitResult: ", resultCode);
            if (resultCode == 0) {
                callback && callback(true);
                // 如果上次登录的房间
                if (this._lastRoomId) {
                    // 加入房间
                    this.joinRoom(this._lastRoomId, () => {
                        let info = JSON.parse(this.room.customRoomProperties);
                        if (info["type"] == ROOM_TYPE.READY || info["type"] == ROOM_TYPE.END) {
                            // 游戏未开始, 退出房间 或 游戏已结束, 退出房间
                            this.leaveRoom();
                            this._lastRoomId = null!;
                        } else {
                            // 游戏剩余时间 s
                            let currTime = Math.floor(Global.GAME_TIME - (new Date().getTime() - info["time"] + this._serverTimeDis) / 1000);
                            if (currTime > 5) {
                                // 游戏时间内, 重新进入房间                               
                                setTimeout(() => {
                                    // 弹窗提示
                                }, 500);
                                this._isJoinDis = true;
                            } else {
                                // 超过游戏时间, 退出房间
                                this.leaveRoom();
                                this._lastRoomId = null!;
                            }
                        }

                        console.log("_lastRoomId reconnect success");
                    }, error => {
                        console.log("_lastRoomId reconnect fail: ", error);
                    }
                    );
                }
            }
        });
        // 调用Client.init方法进行初始化
        this._client.init().then(client => {
            // 已完成初始化请求, 具体初始化结果通过onInitResult回调获取
            this.playerId = client.playerId;
            this._lastRoomId = this._client.lastRoomId;
            this._serverTimeDis = client.loginTimestamp - new Date().getTime();
            console.log("init playerId: ", client.playerId);
        }).catch(error => {
            console.log("调用Client.init方法进行初始化error: ", error);
            callback && callback(false);
        })
    }

    /** 创建房间 */
    public createRoom(callback: Function, errorCallback: Function) {
        this._currFrame = 0;
        this._recvMap = new Map();
        this._isAi = false;
        this._wifiType = WIFI_TYPE.WIFI;
        console.log("createRoom 创建房间");
        this._client.createRoom({
            maxPlayers: Global.MAX_PLAYER,  // 房间最大支持人数，取值范围为[1, 100]。
            matchParams: {},
            customRoomProperties: JSON.stringify({ "type": ROOM_TYPE.NONE, "time": 0 })
        }, {
            customPlayerStatus: 0,              // 选填，自定义玩家状态。
            customPlayerProperties: "boy",      // 选填，自定义玩家属性，最大支持2048个字符。
        }).then(room => {
            this.room = room;
            this.player = room.player;
            this._lastRoomId = room.roomId;
            this.enabledEventRoom();
            console.log("-----------ROOM_READY-----------");
            this.room.updateRoomProperties({ customRoomProperties: JSON.stringify({ "type": ROOM_TYPE.READY, "time": 0 }) });
            callback && callback();
            console.log("创建房间成功");
        }).catch(e => {
            errorCallback && errorCallback(e);
            console.log("创建房间失败 错误: ", e);
        })
    }

    /** 创建AI房间 */
    public createRoomAI(callback: Function, errorCallback: Function) {
        this._isAi = true;
        this._currFrame = 0;
        this._serverTimeDis = 0;
        this._recvMap = new Map();
        this._wifiType = WIFI_TYPE.STAND_ALONE;
        console.log("createRoomAI 创建房间");
        this._roomAloneInfo = new RoomAloneInfo();
        this._roomAloneInfo.ownerId = this.playerId;
        this._roomAloneInfo.roomCode = "0001" + Math.floor(Math.random() * 100);
        this._roomAloneInfo.players = [];
        this._roomAloneInfo.players.push({
            playerId: this.playerId,
            customPlayerProperties: "boy",
        });
        this._roomAloneInfo.players.push({
            playerId: "ai00000",
            customPlayerProperties: "girl",
        });
        this._roomAloneInfo.customRoomProperties = JSON.stringify({ "type": ROOM_TYPE.READY, "time": 0 });
        this._time = 0;
        this._isStartFrameSync = true;
        this._roomType = ROOM_TYPE.READY;
        callback && callback();
    }

    /** 匹配房间 */
    public matchRoom(callback: Function, errorCallback: Function) {
        this._isAi = false;
        this._currFrame = 0;
        this._recvMap = new Map();
        this._wifiType = WIFI_TYPE.WIFI;
        console.log("开始匹配房间");

        this._client.matchRoom({
            maxPlayers: Global.MAX_PLAYER,
            matchParams: {},
            customRoomProperties: JSON.stringify({ "type": ROOM_TYPE.READY, "time": 0 })
        }, {
            customPlayerStatus: 0,
            customPlayerProperties: "boy",
        }).then((room: Room) => {
            console.log("matchRoom success");
            this.room = room;
            this._lastRoomId = room.roomId;
            this.enabledEventRoom();
            // 如果加入房间 默认房主在房间里
            if (this.room.players.length == Global.MAX_PLAYER) {
                this._isRoomOwnIn = true;
            }

            callback && callback();
        }).catch((e) => {
            errorCallback && errorCallback();
            console.log("matchRoom error", e)
        });
    }

    private updateAvailableRooms(callback: Function) {
        let getAvailableRoomsConfig = {
            offset: '0',    // 偏移量
            limit: 10,      // 单次请求获取的房间数量
            sync: true,     // 是否返回帧同步中的房间
        };
        this._client.getAvailableRooms(getAvailableRoomsConfig).then(info => {
            // 查询房间列表成功
            callback && callback();
            console.log("查询房间列表成功: ", info.rooms);
        }).catch(e => {
            console.log("查询房间列表失败: ", e);
        });
    }

    /** 加入房间 */
    public joinRoom(roomId: string, callback: Function, errorCallback: Function) {
        this._isAi = false;
        this._currFrame = 0;
        this._recvMap = new Map();
        this._wifiType = WIFI_TYPE.WIFI;
        console.log("joinRoom 加入房间");
        this._client.joinRoom(roomId, {
            customPlayerStatus: 0,
            customPlayerProperties: "boy",
        }).then(room => {
            // 加入房间中
            this.room = room;
            this.player = room.player;
            this._lastRoomId = room.roomId;
            this.enabledEventRoom();

            // 如果加入房间 默认房主在房间里
            if (room.players.length == Global.MAX_PLAYER) {
                this._isRoomOwnIn = true;
            }

            console.log("加入房间成功");
            callback && callback();
        }).catch(e => {
            console.log("申请加入房间 错误: ", e);
            errorCallback && errorCallback(e);
        });
    }

    /** 更新房间信息 */
    public updateRoom() {
        if (this.room == null) {
            return;
        }
        this.room.update().then((room) => {
            this.room = room;
            console.log("updateRoom", room);
        }).catch((e) => {
            // 获取玩家房间最新信息失败
            console.log("更新房间信息 error", e)
        });
    }

    /** 离开房间 */
    public leaveRoom(callback?: Function, errorCallback?: Function) {
        if (this._isReadyDis) {
            this._isReadyDis = false;
            if (this.room)
                this.room.sendToServer(Global.DISMISS);
        }
        if (this._lastRoomId && this._client) {
            this._client.leaveRoom().then((client) => {
                console.log("离开房间 成功")
                this._client = client;
                this._client.removeAllListeners();
                this.room && this.room.removeAllListeners();
                this.room = null!;
                callback && callback();
            }).catch((e) => {
                errorCallback && errorCallback(e);
                console.log("离开房间 error", e)
            });
        } else {
            this._roomAloneInfo = null!;
            callback && callback();
        }
    }

    /** 房间监听信息 */
    private enabledEventRoom() {
        this._isStartGame = false;
        this._isOtherStartGame = false;
        this.room.onJoin(playerInfo => {
            // 加入房间成功, 做相关游戏逻辑处理
            console.log("onJoin 加入 room.ownerId: ", this.room.ownerId, " playerInfo.playerId: ", playerInfo.playerId);
            if (playerInfo.playerId != this.room.ownerId) {
                Eventer.emit(GobeEvents.ON_OTHER_JOIN_ROOM, playerInfo.playerId);
            } else {
                // 房主加入房间
                this._isRoomOwnIn = true;
            }

            if (playerInfo.playerId != this.playerId) {
                if (this._otherIntervalDis > 0) {
                    clearInterval(this._otherIntervalDis);
                    this._otherIntervalDis = 0;
                }
            }

            if (this.room && playerInfo.playerId == this.playerId && this.room.customRoomProperties) {
                let info = JSON.parse(this.room.customRoomProperties);
                this._roomType = info["type"];
                this._time = info["time"];
            }
        });
        // 加入房间失败
        this.room.onJoinFailed(error => {
            console.log("onJoinFailed 加入失败: ", error);
        });
        // 离开房间监听
        this.room.onLeave(player => {
            console.log("onLeave 离开: ", player.playerId);
            if (player.playerId != this.playerId) {
                this.updateRoom();
            } else {
                this.room.removeAllListeners();
            }
            // 房主离开房间
            if (player.playerId == this.room.ownerId) {
                this._isRoomOwnIn = false;
            }
        });

        this.room.onDisconnect(playerInfo => {
            console.log("onDisconnect: ", playerInfo.playerId);
            // 当前玩家断线
            if (playerInfo.playerId == this.room.playerId) {
                if (this.room) {
                    let interval = setInterval(() => {
                        console.log("onDisconnect: ", interval);
                        if (this.room == null) {
                            clearInterval(interval);
                            return;
                        }
                        this.room.reconnect().then(() => {
                            clearInterval(interval);
                            console.log("reconnect success");
                        }).catch(e => {
                            console.log("reconnect fail: ", e);
                        })
                    }, 1000);
                }
            } else {
                this.updateRoom();
                if (this._roomType == ROOM_TYPE.READY) {
                    let time: number = 10;
                    this._isReadyDis = true;
                    this._otherIntervalDis = setInterval(() => {
                        time--;
                        if (time <= 0) {
                            // 游戏结束
                            Eventer.emit(GobeEvents.ON_GAME_END);
                            this.room.updateRoomProperties({ customRoomProperties: JSON.stringify({ "type": ROOM_TYPE.END, "time": 0 }) });
                            clearInterval(this._otherIntervalDis);
                        }
                    }, 1000);
                }
            }
            // 房间掉线
            if (playerInfo.playerId == this.room.ownerId) {
                this._isRoomOwnIn = false;
            }
        });

        this.room.onRoomPropertiesChange(roomInfo => {
            console.log("onRoomPropertiesChange: ", roomInfo.customRoomProperties);
            let info = JSON.parse(roomInfo.customRoomProperties);
            this._time = info["time"];
            this._roomType = info["type"];
            if (this._roomType == ROOM_TYPE.START) {
                // 游戏开始
                Eventer.emit(GobeEvents.ON_GAME_START);
            } else if (this._roomType == ROOM_TYPE.END) {
                // 游戏结束
                Eventer.emit(GobeEvents.ON_GAME_END);
            } else if (this._roomType == ROOM_TYPE.READY) {
                // 游戏准备
                // Eventer.emit(GobeEvents.ON_GAME_READY);
            }
            this.updateRoom();
        });

        this.room.onStartFrameSync(() => {
            console.log("onStartFrameSync->开始帧同步");
            this._isStartFrameSync = true;
        });

        this.room.onStopFrameSync(() => {
            console.log("onStopFrameSync->结束帧同步");
            this._currFrame = 0;
            this._isStartFrameSync = false;
            this._recvMap = new Map();
        });

        this.room.onRecvFromServer(recvFromServerInfo => {
            console.log("onRecvFromServer->服务器端数据: ", recvFromServerInfo.msg);
            let info = JSON.parse(recvFromServerInfo.msg);
            if (info) {
                if (info["msg"] == Global.START_GAME) {
                    if (info["playerId"] != this.playerId) {
                        this._isOtherStartGame = true;
                    } else {
                        this._isStartGame = true;
                    }
                    if (this.room.ownerId == this.playerId) {
                        if (this._isOtherStartGame && this._isStartGame) {
                            this.room.sendToServer(Global.START_GAME_TIME);
                        }
                    }
                } else if (info["msg"] == Global.START_GAME_TIME) {
                    this._serverTimeDis = info["time"] - new Date().getTime();
                    if (this.room.ownerId == this.playerId) {
                        this.room.startFrameSync();
                        this.room.updateRoomProperties({ customRoomProperties: JSON.stringify({ "type": ROOM_TYPE.START, "time": info["time"], "serverTimeDis": this._serverTimeDis }) });
                    }
                }
            }
        });

        this.room.onRecvFrame(msg => {
            console.log("onRecvFrame: ", msg);
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

    /** 判断是否初始化 */
    public isInited() {
        // 初始化成功后才有玩家Id
        return !!this.playerId;
    }

    public startGame() {
        if (this._isJoinDis) {
            this._isJoinDis = false;
            Eventer.emit(GobeEvents.ON_GAME_START);
        } else {
            if (this._wifiType == WIFI_TYPE.STAND_ALONE) {
                this._roomAloneInfo.customRoomProperties = JSON.stringify({ "type": ROOM_TYPE.START, "time": new Date().getTime() });
                this._roomType = ROOM_TYPE.START;
                this._time = new Date().getTime();
                Eventer.emit(GobeEvents.ON_GAME_START);
            } else {
                if (this.room) {
                    this.room.sendToServer(JSON.stringify({ "msg": Global.START_GAME, "playerId": this.playerId }));
                }
            }
        }
    }

    public finishGame() {
        if (this._wifiType == WIFI_TYPE.STAND_ALONE) {
            this._isStartFrameSync = false;
            this._roomAloneInfo.customRoomProperties = JSON.stringify({ "type": ROOM_TYPE.END, "time": this._time });
            Eventer.emit(GobeEvents.ON_GAME_END);
        } else {
            if (this.room && this.room.ownerId != this.playerId) {
                if (this._isStartFrameSync) {
                    this._isStartFrameSync = false;
                    console.log("finishGame stopFrameSync");
                    this.room.stopFrameSync();
                }
                this.room.updateRoomProperties({ customRoomProperties: JSON.stringify({ "type": ROOM_TYPE.END, "time": this._time }) });
                if (!this._isRoomOwnIn) {
                    Eventer.emit(GobeEvents.ON_GAME_END);
                }
            }
        }
    }
}

