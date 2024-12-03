import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { BlockColor } from '../../data/GameConst';
import { BLANK, BlockCom } from '../com/BlockCom';
import { NonetCom } from '../com/NonetCom';
import { BlockInfo, BlockType } from '../../data/GameData';
import { GameState } from '../../data/GameState';
const { ccclass, property } = _decorator;

@ccclass
export class BoardView extends Component {

    @property(Prefab)
    nonetPrefab: Prefab = null;

    boardId: number = 0;
    curClick: BlockCom = null;    // 点击的格子
    nonetList: NonetCom[] = [];   // 九宫格列表

    public init(boardId: number, board: string[][]): void {
        this.setBoard(boardId, board);
    }

    public setBoard(boardId: number, board: string[][]) {
        this.boardId = boardId;
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
        this.nonetList[index].setNonet(nonetId, board);
    }

    /** 创建九宫格*/
    private createNonet(nonetId: number, board: string[][], parent: Node) {
        let node = instantiate(this.nonetPrefab);
        let nonet = node.getComponent(NonetCom);
        node.setParent(parent);
        nonet.init(nonetId, board);
        this.nonetList.push(nonet);
    }

    /** highlight点击的格子 */
    public highlightClickColor(click: BlockCom) {
        Log.d(`ClickView::onClickBlock, id: ${click.id} row:${click.row} col:${click.col}`);
        let isSelect = !click.isSelect;
        this.setClickBlockColor(click, isSelect);
        if (isSelect) {
            click.setValueColor(BlockColor.White);
            click.setBlockColor(BlockColor.Blue);
        } else {
            click.setValueColor(BlockColor.Black);
            click.setBlockColor(BlockColor.White);
        }
        // 记录状态
        click.isSelect = isSelect;
        this.curClick = click;
    }

    /** highlight与click相同value的[所有]格子 */
    public highlightClickColor_all(value: string) {
        console.log("ClickView::onSelectBlock", value);
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            this.highlightBlockColor(value, block);
        }
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
            this.highlightBlockColor(click.value, block);
        }
    }

    /** highlight与click相同value的格子 */
    private highlightBlockColor(value: string, block: BlockCom): void {
        if (value != BLANK && value == block.value) {
            block.setValueColor(BlockColor.White);
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

    public setBlock(click: BlockCom, value: string) {
        let row = click.row;
        let col = click.col;
        let solve = GameState.gridSolveBoard[row][col];
        if (click.type != BlockType.Lock) {
            if (solve == value) {
                click.setValue(BlockType.Right, value);
            } else {
                click.setValue(BlockType.Fault, value);
            }
        }
    }

    public checkWin(): boolean {
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            if (block.isValid == false) {
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

    public getBlock(blockId: number): BlockCom {
        let nonetIndex = Math.floor(blockId / 9);
        let blockIndex = (blockId - 1) % 9; // error: blockId(79->80)
        return this.nonetList[nonetIndex].blockList[blockIndex];
    }

    public get curBoard() {
        let board = "";
        for (let i = 1; i <= 81; i++) {
            let block = this.getBlock(i);
            board += block.value;
        }
        return board;
    }
}


