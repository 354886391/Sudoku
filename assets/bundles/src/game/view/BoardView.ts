import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { BlockColor } from '../../data/GameConst';
import { BLANK, BlockCom } from '../com/BlockCom';
import { NonetCom } from '../com/NonetCom';
import { BLOCK_TYPE } from '../../data/GameDefine';
import { GameState } from '../../data/GameState';
const { ccclass, property } = _decorator;

@ccclass
export class BoardView extends Component {

    @property(Prefab)
    nonetPrefab: Prefab = null;

    curClick: BlockCom = null;      // 点击的格子
    blockList: BlockCom[] = [];     // 格子列表
    nonetList: NonetCom[] = [];     // 九宫格列表

    public init(board: string[][]) {
        for (let i = 0; i < 9; i++) {
            let nonetId = i + 1;
            if (this.nonetList[i]) {
                this.setNonet(i, nonetId, board);
            } else {
                this.createNonet(nonetId, board, this.node);
            }
        }
    }

    private setNonet(index: number, nonetId: number, board: string[][]) {
        this.nonetList[index].init(nonetId, board, this);
    }

    /** 创建九宫格*/
    private createNonet(nonetId: number, board: string[][], parent: Node) {
        let node = instantiate(this.nonetPrefab);
        node.parent = parent;
        let nonet = node.getComponent(NonetCom);
        nonet.init(nonetId, board, this);
        this.nonetList.push(nonet);
    }

    /** 设置格子颜色 */
    public setBlockColor(block: BlockCom, blockColor: BlockColor): void {
        block.setBlockColor(blockColor);
    }

    /** gray cross and nonet.
     *  highlight the same value in board.
     */
    public setClickBlockColor(click: BlockCom, isSelect: boolean) {
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            // 重置所有格
            block.reset();
            if (click == this.curClick && !isSelect) {
                continue;
            }
            this.grayCrossColor(click, block);
            this.grayNonetColor(click, block);
            this.setBlockResultColor(click.result, block);
        }
    }

    /** 设置点击的格子颜色 */
    public highlightClickBlockColor(click: BlockCom) {
        Log.d(`ClickView::onClickBlock, id: ${click.id} row:${click.row} col:${click.col}`);
        let isSelect = !click.isSelect;
        this.setClickBlockColor(click, isSelect);
        if (isSelect) {
            click.setResultColor(BlockColor.White);
            click.setBlockColor(BlockColor.Blue);
        } else {
            click.setResultColor(BlockColor.Black);
            click.setBlockColor(BlockColor.White);
        }
        // 记录状态
        click.isSelect = isSelect;
        this.curClick = click;
    }

    /** highlight与click相同value的[所有]格子 */
    public highlightBlockResultColor(value: string) {
        console.log("ClickView::onSelectBlock", value);
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            this.setBlockResultColor(value, block);
        }
    }

    /** highlight与click相同value的格子 */
    public setBlockResultColor(value: string, block: BlockCom): void {
        if (value != BLANK && value == block.result) {
            block.setResultColor(BlockColor.White);
            block.setBlockColor(BlockColor.Blue);
        }
    }

    /** gray所在的十字格 */
    private grayCrossColor(click: BlockCom, block: BlockCom): void {
        if (click.row == block.row) {
            block.setBlockColor(BlockColor.Gray);
        }
        if (click.col == block.col) {
            block.setBlockColor(BlockColor.Gray);
        }
    }

    /** gray选中所处的九宫格 */
    private grayNonetColor(click: BlockCom, block: BlockCom): void {
        if (click.nonetId == block.nonetId) {
            block.setBlockColor(BlockColor.Gray);
        }
    }

    public checkWin(): boolean {
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            if (block.IsCorrect == false) {
                return false;
            }
        }
        return true;
    }

    /** 重置所有格 */
    public reset() {
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            block.reset();
        }
    }

    public addBlock(blockId: number, block: BlockCom) {
        this.blockList[blockId - 1] = block;
    }

    public getBlock(blockId: number): BlockCom {
        if (blockId < 1 || blockId > 81) {
            return null;
        }
        else {
            return this.blockList[blockId - 1];
        }
    }

    public setBlock(click: BlockCom, result: string) {
        let solve = GameState.gridSolveBoard[click.row][click.col];
        if (click.type != BLOCK_TYPE.Lock) {
            click.setResult(solve == result ? BLOCK_TYPE.Right : BLOCK_TYPE.Fault, result);
        }
    }

    public get curBoard() {
        let board = "";
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            board += block.result;
        }
        return board;
    }
}


