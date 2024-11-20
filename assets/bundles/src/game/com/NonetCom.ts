import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { BlockInfo, BlockType, NonetInfo } from '../../data/GameData';
import { GameState } from '../../data/GameState';
import { BlockCom } from './BlockCom';

const { ccclass, property } = _decorator;

@ccclass
export class NonetCom extends Component {

    @property(Prefab)
    blockPrefab: Prefab;

    nonetId: number = 0;
    blockList: BlockCom[] = [];   // 块列表
    layout: Layout = null;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
    }

    public init(nonetId: number, board: number[][]): void {
        this.setNonet(nonetId, board);
    }

    /** 生成九宫格 (所有id从1开始; 所有index从0开始) */
    public setNonet(nonetId: number, board: number[][]): void {
        let index = 0;
        this.nonetId = nonetId;
        let nonIndex = nonetId - 1;
        let colIndex = nonIndex % 3 * 3;
        let rowIndex = Math.trunc(nonIndex / 3) * 3;
        for (let row = rowIndex; row < rowIndex + 3; row++) {
            for (let col = colIndex; col < colIndex + 3; col++) {
                let blockInfo: BlockInfo = {
                    id: col + 1,
                    row: row,
                    col: col,
                    type: board[row][col] < 0 ? BlockType.Blank : BlockType.Static,
                    value: board[row][col],
                    isSelect: false,
                }
                if (this.blockList[index]) {
                    this.setBlock(index, nonetId, blockInfo);
                } else {
                    this.createBlock(nonetId, blockInfo, this.node);
                }
                index++;
            }
        }
        // 更新layout布局
        // this.layout.updateLayout();
    }

    private setBlock(index: number, nonetId: number, blockInfo: BlockInfo): void {
        this.blockList[index].setBlock(nonetId, blockInfo);
    }

    /** 创建块 (所有id从1开始; 所有index从0开始) */
    private createBlock(nonetId: number, blockInfo: BlockInfo, parent: Node): void {
        let node = instantiate(this.blockPrefab);
        let item = node.getComponent(BlockCom);
        node.setParent(parent);
        item.init(nonetId, blockInfo);
        this.blockList.push(item);
    }
}


