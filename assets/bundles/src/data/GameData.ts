
export interface MapData {
    id: number;
    /** 所有id从1开始 */
    map: { [rectId: number]: number[] };
}