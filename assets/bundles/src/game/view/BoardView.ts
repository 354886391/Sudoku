import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
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
            let nonet = this.nonetList[i];
            if (nonet) {
                nonet.setNonet(nonetId, board);
            } else {
                this.createNonet(nonetId, board, this.node);
            }
        }
    }

    public initCandidate(board: string[][]) {
        for (let i = 0; i < this.blockList.length; i++) {
            const candidate = board[Math.floor(i / 9)][i % 9];
            if (candidate != BLANK && candidate.length > 1) {
                let block = this.blockList[i];
                if (block) {
                    block.setCandidate(candidate);
                }
            }
        }
    }

    /** 创建九宫格*/
    private createNonet(nonetId: number, board: string[][], parent: Node) {
        let node = instantiate(this.nonetPrefab);
        let nonet = node.getComponent(NonetCom);
        node.parent = parent;
        nonet.init(nonetId, board, this);
        this.nonetList.push(nonet);
    }

    /** gray cross and nonet.
     *  highlight the same value in board.
     */
    public setClickBlockColor(click: BlockCom, isSelect: boolean) {
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            if (block) {
                block.isSelect = false;
                this.resetBlockColor(block);    // 重置格子颜色
                if (click == this.curClick && !isSelect) {
                    // 再次点击时
                    continue;
                }
                this.grayCrossColor(block, click);
                this.grayNonetColor(block, click);
                this.highlightSameColor(block, click);
            }
        }
    }

    /** 设置点击的格子颜色 */
    public highlightClickBlockColor(click: BlockCom) {
        Log.d(`ClickView::onClickBlock, id: ${click.id} row:${click.row} col:${click.col}`);
        let isSelect = !click.isSelect;
        this.setClickBlockColor(click, isSelect);
        // if (isSelect) {
        //     click.setResultColor(BlockColor.White);
        //     click.setBlockColor(BlockColor.LightCyan);
        // } else {
        //     click.setResultColor(BlockColor.Black);
        //     click.setBlockColor(BlockColor.White);
        // }
        click.isSelect = isSelect;  // 记录点击状态
        this.curClick = click;
    }

    /** highlight与click相同value的[所有]格子 */
    public highlightBlockResultColor(value: string) {
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            this.setResultBlockColor(block, value);
        }
    }

    /** highlight与click相同value的格子 */
    public setResultBlockColor(block: BlockCom, value: string): void {
        if (value != BLANK && value == block.result) {
            block.setResultColor(BlockColor.White);
            block.setBlockColor(BlockColor.SlateGray);
        }
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

    /** highlight与click相同value的格子 */
    public highlightSameColor(block: BlockCom, click: BlockCom) {
        if (click.result == BLANK) {
            click.setResultColor(BlockColor.White);
            click.setBlockColor(BlockColor.LightCyan);
            return;
        }
        if (click.result == block.result) {
            if (click == block) {
                block.setResultColor(BlockColor.White);
                block.setBlockColor(BlockColor.LightCyan);
            } else {
                block.setResultColor(BlockColor.White);
                block.setBlockColor(BlockColor.SlateGray);
            }
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

    /** 重置所有格 (包括) */
    public reset(inOther: boolean = true) {
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            this.resetBlock(block, inOther);
        }
    }

    public resetBlockColor(block: BlockCom) {
        if (block.type != BLOCK_TYPE.Other &&
            block.type != BLOCK_TYPE.Right &&
            block.type != BLOCK_TYPE.Fault) {
            block.setBlockColor(BlockColor.White);
            block.setResultColor(BlockColor.Black);
        }
    }

    /** 重置格子 */
    public resetBlock(block: BlockCom, inOther: boolean = true) {
        if (inOther) {
            block.resetBlock();
        } else if (block.type != BLOCK_TYPE.Other) {
            block.resetBlock(); // 不重置other
        }
    }

    public addBlock(blockId: number, block: BlockCom) {
        this.blockList[blockId - 1] = block;
    }

    public getBlock(blockId: number): BlockCom {
        return blockId >= 1 && blockId <= 81 ? this.blockList[blockId - 1] : null;
    }

    public setBlock(click: BlockCom, result: string) {
        if(result == BLANK){
            click.setResult(BLOCK_TYPE.BLANK, result);
            click.setResultColor(BlockColor.Black);
            click.setBlockColor(BlockColor.White);
            return;
        }
        let row = click.row;
        let col = click.col;
        let solve = GameState.gridSolveBoard[row][col];
        if (solve == result) {
            click.setResult(BLOCK_TYPE.Right, result);
            click.setResultColor(BlockColor.LightGreen);
            click.setBlockColor(BlockColor.White);
        } else {
            click.setResult(BLOCK_TYPE.Fault, result);
            click.setResultColor(BlockColor.LightPink);
            click.setBlockColor(BlockColor.White);
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


