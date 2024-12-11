import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { BlockInfo, BLOCK_TYPE } from '../../data/GameDefine';
import { BlockCom, BLANK } from './BlockCom';
import { BoardView } from '../view/BoardView';

const { ccclass, property } = _decorator;

@ccclass
export class NonetCom extends Component {

    @property(Prefab)
    blockPrefab: Prefab;

    boardView: BoardView = null;
    blockList: BlockCom[] = [];   // 块列表

    public init(nonetId: number, board: string[][], view: BoardView): void {
        this.boardView = view;
        let index = 0;
        let nonIndex = nonetId - 1;
        let colIndex = nonIndex % 3 * 3;
        let rowIndex = Math.trunc(nonIndex / 3) * 3;
        for (let row = rowIndex; row < rowIndex + 3; row++) {
            for (let col = colIndex; col < colIndex + 3; col++) {
                let id = row * 9 + col + 1;
                let result = board[row][col];
                let type = result == BLANK ? BLOCK_TYPE.Void : BLOCK_TYPE.Lock;
                let info: BlockInfo = {
                    id: id,
                    row: row,
                    col: col,
                    type: type,
                    result: result,
                    isSelect: false,
                }
                if (this.blockList[index]) {
                    this.setBlock(index, info);
                } else {
                    this.createBlock(nonetId, info, this.node);
                }
                index++;
            }
        }
    }

    private setBlock(index: number, info: BlockInfo): void {
        this.blockList[index].setBlock(info);
    }

    /** 创建格子 (所有id从1开始; 所有index从0开始) */
    private createBlock(nonetId: number, info: BlockInfo, parent: Node): void {
        let node = instantiate(this.blockPrefab);
        node.parent = parent;
        let item = node.getComponent(BlockCom);
        item.init(nonetId, info);
        this.blockList.push(item);
        this.boardView.addBlock(info.id, item);
    }
}


