import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { GameState } from '../data/GameState';
import { ClickNonet } from './ClickNonet';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GameEvent } from '../data/GameEvent';
import { ClickBlock } from './ClickBlock';
import { BlockColor } from '../data/GameConst';
import { SelectView } from './SelectView';
import { SelectBlock } from './SelectBlock';
const { ccclass, property } = _decorator;

@ccclass('ClickView')
export class ClickView extends Component {

    @property(Prefab)
    nonetPrefab: Prefab = null;
    @property(SelectView)
    selectView: SelectView = null;

    lastClick: ClickBlock = null;
    nonetList: ClickNonet[] = [];

    layout: Layout = null;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
        Eventer.on(GameEvent.OnClickBlock, this.onClickBlock, this);
        Eventer.on(GameEvent.OnSelectBlock, this.onSelectBlock, this);
    }

    public init(): void {
        this.generate();
        this.selectView.init();
    }

    //生成View
    private generate(): void {
        let map = GameState.gameData.map;
        for (const key in map) {
            if (map.hasOwnProperty(key)) {
                let nonetId = Number(key);
                this.createNonet(nonetId, this.node);
            }
        }
    }

    /** 创建九宫格*/
    private createNonet(nonetId: number, parent: Node) {
        let node = instantiate(this.nonetPrefab);
        let nonet = node.getComponent(ClickNonet);
        node.setParent(parent);
        nonet.init(nonetId);
        this.nonetList.push(nonet);
        // 更新layout布局
        this.layout.updateLayout();
    }

    private onClickBlock(click: ClickBlock) {
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
            click.setValColor(BlockColor.White);
            click.setBlockColor(BlockColor.Blue);
        } else {
            click.setValColor(BlockColor.Black);
            click.setBlockColor(BlockColor.White);
        }
        // 记录状态
        click.isSelect = isSelect;
        this.lastClick = click;
    }

    public onSelectBlock(select: SelectBlock) {
        console.log("ClickView::onSelectBlock", select.blockId);
        if (this.lastClick.isSelect) {
            this.lastClick.setValue(select.value);
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
    private dimCrossColor(click: ClickBlock, block: ClickBlock): void {
        if (click.row == block.row) {
            block.setBlockColor(BlockColor.Gray);
        }
        if (click.col == block.col) {
            block.setBlockColor(BlockColor.Gray);
        }
    }

    /** dim选中所处的九宫格 */
    private dimNonetColor(click: ClickBlock, block: ClickBlock): void {
        if (click.nonetId == block.nonetId) {
            block.setBlockColor(BlockColor.Gray);
        }
    }

    /** highlight相同Val的格子 */
    private highlightValueColor(click: ClickBlock, block: ClickBlock): void {
        if (click.value > 0 && click.value == block.value) {
            block.setValColor(BlockColor.White);
            block.setBlockColor(BlockColor.Blue);
        }
    }

    getBlockList(nonetId: number): ClickBlock[] {
        return this.nonetList[nonetId - 1].blockList;
    }
}


