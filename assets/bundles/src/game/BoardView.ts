import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { GameState } from '../data/GameState';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GameEvent } from '../data/GameEvent';
import { BlockColor } from '../data/GameConst';
import { OptionCom } from './com/OptionCom';
import { BlockCom } from './com/BlockCom';
import { NonetCom } from './com/NonetCom';
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
        Eventer.on(GameEvent.OnClickBlock, this.onClickBlock, this);
        Eventer.on(GameEvent.OnSelectBlock, this.onSelectBlock, this);
    }

    public init(boardId: number): void {
        this.generate(boardId);
    }

    //生成View
    private generate(boardId: number): void {
        this.boardId = boardId;
        for (let i = 0; i < 9; i++) {
            this.createNonet(i + 1, this.node);
        }
        // 更新layout布局
        this.layout.updateLayout();
    }

    /** 创建九宫格*/
    private createNonet(nonetId: number, parent: Node) {
        let node = instantiate(this.nonetPrefab);
        let nonet = node.getComponent(NonetCom);
        node.setParent(parent);
        nonet.init(nonetId);
        this.nonetList.push(nonet);

    }

    private onClickBlock(click: BlockCom) {
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
                this.highlightValueColor(click, block);
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

    public onSelectBlock(select: OptionCom) {
        console.log("ClickView::onSelectBlock", select.blockId);
        if (this.lastClick.isSelect) {
            this.lastClick.setBlock(0, select.blockVal);
            for (let i = 0; i < this.nonetList.length; i++) {
                let nonetId = i + 1;
                let blockList = this.getBlockList(nonetId);
                for (let j = 0; j < blockList.length; j++) {
                    let block = blockList[j];
                    this.highlightValueColor(this.lastClick, block);
                }
            }
        }
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

    /** highlight相同Val的格子 */
    private highlightValueColor(click: BlockCom, block: BlockCom): void {
        if (click.value != 0 && click.value == block.value) {
            block.setValueColor(BlockColor.White);
            block.setBlockColor(BlockColor.Blue);
        }
    }

    private getBlockList(nonetId: number): BlockCom[] {
        return this.nonetList[nonetId - 1].blockList;
    }

    private sameBlock(a: BlockCom, b: BlockCom) {
        return a != null && b != null && a.blockId == b.blockId && a.row == b.row && a.col == b.col;
    }
}


