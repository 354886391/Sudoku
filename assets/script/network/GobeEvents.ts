export enum GobeEvents {
    ON_RECV_SYNC = 'onRecvSync',        //帧同步数据
    
    ON_GET_ROOM_INFO = "onGetRoomInfo", //获取到房间信息

    ON_OTHER_JOIN_ROOM = "onOtherJoinRoom", // 其他玩家加入房间
    ON_OWNER_JOIN_ROOM = "onOwnerJoinRoom", // 房主加入房间

    ON_GAME_READY = 'onGameReady',      //玩家准备
    ON_GAME_READYGO = 'onGameGO',       //准备游戏
    ON_GAME_START = 'onGameStart',      //开始游戏
    ON_GAME_END = 'onGameEnd',          //结束游戏
}