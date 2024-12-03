import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { BlockInfo, BlockType } from '../../data/GameData';
import { BlockCom, BLANK } from './BlockCom';

const { ccclass, property } = _decorator;

@ccclass
export class NonetCom extends Component {

    @property(Prefab)
    blockPrefab: Prefab;

    blockList: BlockCom[] = [];   // 块列表
    layout: Layout = null;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
    }

    public init(nonetId: number, board: string[][]): void {
        this.setNonet(nonetId, board);
    }

    /** 生成九宫格 (所有id从1开始; 所有index从0开始) */
    public setNonet(nonetId: number, board: string[][]): void {
        let index = 0;
        let nonIndex = nonetId - 1;
        let colIndex = nonIndex % 3 * 3;
        let rowIndex = Math.trunc(nonIndex / 3) * 3;
        for (let row = rowIndex; row < rowIndex + 3; row++) {
            for (let col = colIndex; col < colIndex + 3; col++) {
                let id = row * 9 + col + 1;
                let value = board[row][col];
                let type = value == BLANK ? BlockType.Void : BlockType.Lock;
                let blockInfo: BlockInfo = {
                    id: id,
                    row: row,
                    col: col,
                    type: type,
                    value: value,
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


