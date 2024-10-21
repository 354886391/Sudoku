
export interface BlockInfo {
    isSelect: boolean;
    writable: boolean;
    id: number;
    row: number;
    col: number;
    value: number;
    result: number;
}

export interface MapInfo {
    id: number;
    /** 所有id从1开始 */
    map: { [nonetId: number]: number[] };
}