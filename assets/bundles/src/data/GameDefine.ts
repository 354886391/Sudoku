export enum BLOCK_TYPE {
    /** 空白 */
    BLANK = 0,
    /** 锁定 */
    LOCK,
    /** 正确 */
    RIGHT,
    /** 错误 */
    FAULT,
    /** 其他 */
    OTHER,
}

export interface Channel {
    openId: string,         //玩家渠道id
    name: string,           //玩家昵称
    headUrl: string,        //玩家头像
    state: number,          //玩家状态
    delayTime: number       //延迟时间
}

export interface Player {
    id: number,
    score: number,
    isLead: boolean,
    channel: Channel,       //玩家渠道信息
}

export class Frame {
    isAi?: boolean;
    steps?: number;
    board?: string;

    blockId?: number;
    optionId?: number;
}

/** 方块信息 */
export interface BlockInfo {
    id: number;
    row: number;
    col: number;
    status: BLOCK_TYPE;
    result: string;
    isSelect: boolean;
}

export interface PlayerInfo {
    pid?: string;
    name?: string;
    avatar?: string;
    staticId?: number;
}

export interface HistoryInfo {
    pid?: string;
}

export interface SettingInfo {
    pid?: string;
}