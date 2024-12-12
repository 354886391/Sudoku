export enum BlockColor {
    Red = "#FFCBD5",    // 255,203,213
    Cyan = "#B2DFFE",   // 178,223,254
    Blue = "#C4D7EA",   // 196,215,234
    Gold = "#FFD700",   // 255,215,0
    Gray = "#E3EBF3",   // 227,235,243
    White = "#FFFFFF",  // 255,255,255
    Black = "#000000"   // 0,0,0
}

//本地缓存key值
export const LOCAL_CACHE = {
    PLAYER: 'player',               //玩家基础数据缓存，如金币砖石等信息，暂时由客户端存储，后续改由服务端管理
    SETTINGS: 'settings',           //设置相关，所有杂项都丢里面进去
    DATA_VERSION: 'dataVersion',    //数据版本
    ACCOUNT: 'account',             //玩家账号
    // TMP_DATA: 'tmpData',         //临时数据，不会存储到云盘
    HISTORY: "history",             //关卡通关数据
    BAG: "bag",                     //玩家背包，即道具列表，字典类型
}

export const NETWORK_STATUS = {
    COMMON_OFFLINE: 0,
    COMMON_ONLINE: 1,
    RELAY_OFFLINE: 2,
    RELAY_ONLINE: 3,
}

export const FRAME_SYNC_STATE = {
    STOP: 0,
    START: 1
}
