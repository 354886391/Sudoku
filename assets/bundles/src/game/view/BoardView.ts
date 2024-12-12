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

    public initCandidate(board: string[][]) {
        for (let i = 0; i < this.blockList.length; i++) {
            const candidate = board[Math.floor(i / 9)][i % 9];
            if (candidate != BLANK && candidate.length > 1) {
                this.blockList[i].setCandidate(candidate);
            }
        }
    }

    public setBlockCandidate(blockId: number, candidate: string) {
        this.getBlock(blockId).setCandidate(candidate);
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
            this.grayCrossColor(block, click);
            this.grayNonetColor(block, click);
            this.setResultBlockColor(block, click.result);
        }
    }

    /** 设置点击的格子颜色 */
    public highlightClickBlockColor(click: BlockCom) {
        Log.d(`ClickView::onClickBlock, id: ${click.id} row:${click.row} col:${click.col}`);
        let isSelect = !click.isSelect;
        this.setClickBlockColor(click, isSelect);
        this.setHighlightBlockColor(click, isSelect);
        // 记录状态
        click.isSelect = isSelect;
        this.curClick = click;
    }

    /** highlight与click相同value的[所有]格子 */
    public highlightBlockResultColor(value: string) {
        console.log("ClickView::onSelectBlock", value);
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            this.setResultBlockColor(block, value);
        }
    }

    /** highlight与click相同value的格子 */
    public setResultBlockColor(block: BlockCom, value: string): void {
        let isHighlight = value != BLANK && value == block.result
        this.setHighlightBlockColor(block, isHighlight);
    }

    /** gray所在的十字格 */
    private grayCrossColor(block: BlockCom, click: BlockCom): void {
        if (block.row == click.row) {
            block.setBlockColor(BlockColor.Gray);
        }
        if (block.col == click.col) {
            block.setBlockColor(BlockColor.Gray);
        }
    }

    /** gray选中所处的九宫格 */
    private grayNonetColor(block: BlockCom, click: BlockCom): void {
        if (block.nonetId == click.nonetId) {
            block.setBlockColor(BlockColor.Gray);
        }
    }

    private setHighlightBlockColor(block: BlockCom, isHighlight: boolean) {
        block.setResultColor(isHighlight ? BlockColor.White : BlockColor.Black);
        block.setBlockColor(isHighlight ? BlockColor.Blue : BlockColor.White);
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

    /** 重置所有格 (包括) */
    public reset(inOther: boolean = true) {
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            if (inOther) {
                block.reset();
            } else if (block.type != BLOCK_TYPE.Other) {
                // 不重置other
                block.reset();
            }
        }
    }

    public addBlock(blockId: number, block: BlockCom) {
        this.blockList[blockId - 1] = block;
    }

    public getBlock(blockId: number): BlockCom {
        return blockId >= 1 && blockId <= 81 ? this.blockList[blockId - 1] : null;
    }

    public setBlock(click: BlockCom, result: string) {
        let solve = GameState.gridSolveBoard[click.row][click.col];
        click.setResult(solve == result ? BLOCK_TYPE.Right : BLOCK_TYPE.Fault, result);
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


