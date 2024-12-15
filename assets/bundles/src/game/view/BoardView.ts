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

    /** 创建九宫格 */
    private createNonet(nonetId: number, board: string[][], parent: Node) {
        let node = instantiate(this.nonetPrefab);
        let nonet = node.getComponent(NonetCom);
        node.parent = parent;
        nonet.init(nonetId, board, this);
        this.nonetList.push(nonet);
    }

    /** 设置点击的格子颜色 */
    public onClickBlockBGColor(click: BlockCom) {
        let isSelect = !click.isSelect;
        this.setClickBlockBGColor(click, isSelect);
        click.isSelect = isSelect;  // 记录点击状态
    }

    /** gray cross and nonet.
    *  highlight the same value in board.
    */
    public setClickBlockBGColor(click: BlockCom, isSelect: boolean) {
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            if (block) {
                block.isSelect = false;
                this.resetBlockBGColor(block);    // 重置格子颜色
                if (click == this.curClick && !isSelect) {
                    continue;
                }
                this.grayCrossBlockBGColor(block, click);
                this.grayNonetBlockBGColor(block, click);
                this.lightSameBlockBGColor(block, click);
            }
        }
        this.curClick = click;
    }

    /** gray所在的十字格 */
    private grayCrossBlockBGColor(block: BlockCom, click: BlockCom) {
        if (block.row == click.row) {
            block.setBlockBGColor(BlockColor.Gray);
        }
        if (block.col == click.col) {
            block.setBlockBGColor(BlockColor.Gray);
        }
    }

    /** gray选中所处的九宫格 */
    private grayNonetBlockBGColor(block: BlockCom, click: BlockCom) {
        if (block.nonetId == click.nonetId) {
            block.setBlockBGColor(BlockColor.Gray);
        }
    }

    /** highlight与click相同value的格子 */
    public lightSameBlockBGColor(block: BlockCom, click: BlockCom) {
        if (click.result == BLANK) {
            click.setBlockBGColor(BlockColor.LightCyan);
            return;
        }
        if (click.result == block.result) {
            if (click == block) {
                block.setBlockBGColor(BlockColor.LightCyan);
            } else {
                block.setBlockBGColor(BlockColor.SlateGray);
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
    public resetAllBlocks(inOther: boolean = true) {
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            if (inOther) {
                block.resetBlock();
            } else if (block.type != BLOCK_TYPE.OTHER) {
                block.resetBlock(); // 不重置other
            }
        }
    }

    public resetBlockBGColor(block: BlockCom) {
        if (block.type != BLOCK_TYPE.OTHER) {
            block.setBlockBGColor(BlockColor.White);
        }
    }

    public clearAllCandidates(){
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            block.setCandidate("");
        }
    }

    public addBlock(blockId: number, block: BlockCom) {
        this.blockList[blockId - 1] = block;
    }

    public getBlock(blockId: number): BlockCom {
        return blockId >= 1 && blockId <= 81 ? this.blockList[blockId - 1] : null;
    }

    public setBlock(click: BlockCom, result: string) {
        if (result == BLANK) {
            click.setResult(BLOCK_TYPE.BLANK, result);
            click.setResultColor(BlockColor.Black);
            click.setBlockBGColor(BlockColor.White);
            return;
        }
        let row = click.row;
        let col = click.col;
        let solve = GameState.gridSolveBoard[row][col];
        if (result == solve) {
            click.setResult(BLOCK_TYPE.RIGHT, result);
            click.setResultColor(BlockColor.LightGreen);
            click.setBlockBGColor(BlockColor.LightCyan);
        } else {
            click.setResult(BLOCK_TYPE.FAULT, result);
            click.setResultColor(BlockColor.LightPink);
            click.setBlockBGColor(BlockColor.LightCyan);
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


