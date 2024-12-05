export enum BlockColor {
    Red = "#FF6A6A",
    Gold = "#FFD700",
    Blue = "#3399FF",
    Gray = "#E8E8E8",
    White = "#FFFFFF",
    Black = "#000000"
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
