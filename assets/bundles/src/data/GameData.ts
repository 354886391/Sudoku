/** 方块信息 */
export interface BlockInfo {
    id: number;
    row: number;
    col: number;
    value: number;
    result: number;
    isSelect: boolean;
    writable: boolean;
}

/** 九宫格信息 */
export interface NonetInfo {
    id: number;
    blocks: BlockInfo[];
}

/** 地图信息 */
export interface RegionInfo {
    id: number;
    /** 所有id从1开始 */
    region: { [nonetId: number]: number[] };
}