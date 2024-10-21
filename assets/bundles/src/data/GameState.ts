import { MapInfo } from "./GameData";

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

export class GameState {

    static gameData: MapInfo = {
        id: 1,
        map: {
            1: [-1, 2, 3, 4, -5, 6, 7, 8, -9], 2: [1, -2, 3, 4, -5, 6, 7, -8, 9], 3: [1, 2, -3, 4, -5, 6, -7, 8, 9],
            4: [1, 2, 3, -4, -5, -6, 7, 8, 9], 5: [-1, -2, -3, -4, -5, -6, -7, -8, -9], 6: [1, 2, 3, -4, -5, -6, 7, 8, 9],
            7: [1, 2, -3, 4, -5, 6, -7, 8, 9], 8: [1, -2, 3, 4, -5, 6, 7, -8, 9], 9: [-1, 2, 3, 4, -5, 6, 7, 8, -9],
        }
    };
}