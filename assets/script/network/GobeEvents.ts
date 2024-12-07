export enum GobeEvents {
    ON_GET_ROOM_INFO = "onGetRoomInfo", //获取到房间信息
    ON_RECV_SYNC = 'onRecvSync',        //帧同步数据
    ON_OTHER_JOIN_ROOM = "onOtherJoinRoom", // 加入房间

    ON_GAME_READY = 'onGameReady',      //游戏准备开始
    ON_GAME_READYGO = 'onGameGO',       //开始游戏
    ON_GAME_START = 'onGameStart',      //开始游戏
    ON_GAME_END = 'onGameEnd',          //结束游戏
}