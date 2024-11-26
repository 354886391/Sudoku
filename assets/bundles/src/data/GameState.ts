import { BoardInfo } from "./GameData";

export class Frame {
    /** 当前玩家Id */
    userId: number;
    /** 状态 (0: 无操作; 1: )*/
    status: number;
    /** 当前帧数据 */
    action: any;
    /** 当前总步数 */
    count?: number;
    /** 金币数据 */
    coins?: number;
}

export interface Player { //道具信息
    id: number,         //道具信息
    score: number,          //玩家积分
    isLead: boolean,//是否分数领先
    channel: Channel,       //玩家渠道信息
}

export interface Channel {
    openId: string,         //玩家渠道id
    name: string,           //玩家昵称
    headUrl: string,        //玩家头像
    state: number,      //玩家状态
    delayTime: number   //延迟时间
}

export class GameState {

    static id: number;              //逻辑帧标示符
    static time: number;            //剩余时间
    static frameTime: number;       //当前帧的时间
    static players: Player[] = [];  //玩家信息

    /**
     * 4.25..389
     * ....4.265
     * ..523.147
     * ..1652.7.
     * 6..194532
     * 254387691
     * 5....3.1.
     * ...4..9..
     * ...8....3
     */
    static boardInfo: BoardInfo = {
        id: 1,
        level: 1,
        board:
            [
                [4, -6, 2, 5, -7, -1, 3, 8, 9],
                [-3, -1, -7, -9, 4, -8, 2, 6, 5],
                [-8, -9, 5, 2, 3, -6, 1, 4, 7],
                [-9, -3, 1, 6, 5, 2, -4, 7, -8],
                [6, -7, -8, 1, 9, 4, 5, 3, 2],
                [2, 5, 4, 3, 8, 7, 6, 9, 1],
                [5, -2, -9, -7, -6, 3, -8, 1, -4],
                [-7, -8, -3, 4, -1, -5, 9, -2, -6],
                [-1, -4, -6, 8, -2, -9, -7, -5, 3],
            ],
        // candidates: [
        //     [4, -167, 2, 5, -167, -16, 3, 8, 9],
        //     [-13789, -13789, -3789, -79, 4, -189, 2, 6, 5],
        //     [-89, -689, 5, 2, 3, -689, 1, 4, 7],
        //     [-389, -389, 1, 6, 5, 2, -48, 7, 48],
        //     [6, -78, -78, 1, 9, 4, 5, 3, 2],
        //     [2, 5, 4, 3, 8, 7, 6, 9, 1],
        //     [5, -246789, -6789, -79, -267, 3, -478, 1, -468],
        //     [-1378, -123678, -3678, 4, -1267, -156, 9, -25, -68],
        //     [-179, -124679, -679, 8, -1267, -1569, -47, -25, 3]
        // ]
    };
}