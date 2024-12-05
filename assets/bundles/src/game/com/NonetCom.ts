import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { BlockInfo, BlockType } from '../../data/GameData';
import { BlockCom, BLANK } from './BlockCom';
import { BoardView } from '../view/BoardView';

const { ccclass, property } = _decorator;

@ccclass
export class NonetCom extends Component {

    @property(Prefab)
    blockPrefab: Prefab;

    boardView: BoardView = null;
    blockList: BlockCom[] = [];   // 块列表
    layout: Layout = null;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
    }

    public init(nonetId: number, board: string[][], boardView: BoardView): void {
        this.boardView = boardView;
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
                let result = board[row][col];
                let type = result == BLANK ? BlockType.Void : BlockType.Lock;
                let info: BlockInfo = {
                    id: id,
                    row: row,
                    col: col,
                    type: type,
                    result: result,
                    isSelect: false,
                }
                if (this.blockList[index]) {
                    this.setBlock(index, nonetId, info);
                } else {
                    this.createBlock(nonetId, info, this.node);
                }
                index++;
            }
        }
    }

    private setBlock(index: number, nonetId: number, info: BlockInfo): void {
        this.blockList[index].setBlock(nonetId, info);
    }

    /** 创建格子 (所有id从1开始; 所有index从0开始) */
    private createBlock(nonetId: number, info: BlockInfo, parent: Node): void {
        let node = instantiate(this.blockPrefab);
        let item = node.getComponent(BlockCom);
        node.setParent(parent);
        item.init(nonetId, info);
        this.blockList.push(item);
        this.boardView.addBlock(info.id, item);
    }
}


