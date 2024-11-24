import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { BlockColor } from '../../data/GameConst';
import { BlockCom } from '../com/BlockCom';
import { NonetCom } from '../com/NonetCom';
const { ccclass, property } = _decorator;

@ccclass
export class BoardView extends Component {

    @property(Prefab)
    nonetPrefab: Prefab = null;

    boardId: number = 0;
    lastClick: BlockCom = null;   // 上次点击的格子
    nonetList: NonetCom[] = [];   // 九宫格列表

    layout: Layout = null;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
    }

    public init(boardId: number, board: number[][]): void {
        this.setBoard(boardId, board);
    }

    public setBoard(boardId: number, board: number[][]) {
        this.boardId = boardId;
        for (let i = 0; i < 9; i++) {
            let nonetId = i + 1;
            if (this.nonetList[i]) {
                this.setNonet(i, nonetId, board);
            } else {
                this.createNonet(nonetId, board, this.node);
            }
        }
        // 更新layout布局
        // this.layout.updateLayout();
    }

    private setNonet(index: number, nonetId: number, board: number[][]) {
        this.nonetList[index].setNonet(nonetId, board);
    }

    /** 创建九宫格*/
    private createNonet(nonetId: number, board: number[][], parent: Node) {
        let node = instantiate(this.nonetPrefab);
        let nonet = node.getComponent(NonetCom);
        node.setParent(parent);
        nonet.init(nonetId, board);
        this.nonetList.push(nonet);
    }

    /** 点击block高亮 */
    public highlightClickColor(click: BlockCom) {
        Log.d(`ClickView::onClickBlock, id: ${click.blockId} row:${click.row} col:${click.col}`);
        let isSelect = !click.isSelect;
        for (let i = 0; i < this.nonetList.length; i++) {
            let nonetId = i + 1;
            let blockList = this.getBlockList(nonetId);
            for (let j = 0; j < blockList.length; j++) {
                let block = blockList[j];
                // 重置所有格
                block.reset();
                if (click == this.lastClick && !isSelect) {
                    continue;
                }
                this.dimCrossColor(click, block);
                this.dimNonetColor(click, block);
                this.highlightBlockColor(click.value, block);
            }
        }
        if (isSelect) {
            click.setValueColor(BlockColor.White);
            click.setBlockColor(BlockColor.Blue);
        } else {
            click.setValueColor(BlockColor.Black);
            click.setBlockColor(BlockColor.White);
        }
        // 记录状态
        click.isSelect = isSelect;
        this.lastClick = click;
    }

    /** dim所在的十字格 */
    private dimCrossColor(click: BlockCom, block: BlockCom): void {
        if (click.row == block.row) {
            block.setBlockColor(BlockColor.Gray);
        }
        if (click.col == block.col) {
            block.setBlockColor(BlockColor.Gray);
        }
    }

    /** dim选中所处的九宫格 */
    private dimNonetColor(click: BlockCom, block: BlockCom): void {
        if (click.nonetId == block.nonetId) {
            block.setBlockColor(BlockColor.Gray);
        }
    }

    /** highlight与click相同value的格子 */
    private highlightBlockColor(value: number, block: BlockCom): void {
        if (value != 0 && value == block.value) {
            block.setValueColor(BlockColor.White);
            block.setBlockColor(BlockColor.Blue);
        }
    }

    /** highlight与click相同value的[所有]格子 */
    public highlightBlockColor_all(value: number) {
        console.log("ClickView::onSelectBlock", value);
        for (let i = 0; i < this.nonetList.length; i++) {
            let nonetId = i + 1;
            let blockList = this.getBlockList(nonetId);
            for (let j = 0; j < blockList.length; j++) {
                let block = blockList[j];               
                this.highlightBlockColor(value, block);
            }
        }
    }

    /** 重置所有格 */
    public reset(){
        for (let i = 0; i < this.nonetList.length; i++) {
            let nonetId = i + 1;
            let blockList = this.getBlockList(nonetId);
            for (let j = 0; j < blockList.length; j++) {
                blockList[j].reset();
            }
        }
    }

    private getBlockList(nonetId: number): BlockCom[] {
        return this.nonetList[nonetId - 1].blockList;
    }
}


