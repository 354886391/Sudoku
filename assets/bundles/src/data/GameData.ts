
export enum BlockType {
    /** 空白 */
    Void = 0,
    /** 锁定 */
    Lock,
    /** 正确 */
    Right,
    /** 错误 */
    Fault,
    /** 候选 */
    Candidate,
}

/** 方块信息 */
export interface BlockInfo {
    id: number;
    row: number;
    col: number;
    value: string;
    type: BlockType;
    isSelect: boolean;
}

/** 地图信息 */
export interface BoardInfo {
    /** 标识 */
    id: number;
    /** 等级 */
    level: number;
    /** 牌面 */
    board: string;
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
