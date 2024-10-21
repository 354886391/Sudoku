import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { GameState } from '../data/GameState';
import { ClickNonet } from './ClickNonet';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GameEvent } from '../data/GameEvent';
import { ClickBlock } from './ClickBlock';
import { BlockColor } from '../data/GameConst';
const { ccclass, property } = _decorator;

@ccclass('ClickView')
export class ClickView extends Component {

    @property(Prefab)
    nonetPrefab: Prefab = null;

    lastClick: ClickBlock = null;
    nonetList: ClickNonet[] = [];

    layout: Layout = null;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
        Eventer.on(GameEvent.OnClickBlock, this.onBlockClicked, this);
    }

    public init(): void {
        this.generate();
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

    private onBlockClicked(click: ClickBlock) {
        Log.d(`onBlockClicked id: ${click.blockId} row:${click.row} col:${click.col}`);
        let viewRow = click.row;
        let viewCol = click.col;
        let isSelect = !click.hasSelect;
        for (let i = 0; i < this.nonetList.length; i++) {
            let nonet = this.nonetList[i];
            let blockList = nonet.blockList;
            for (let j = 0; j < blockList.length; j++) {
                let block = blockList[j];
                // highlight所有格
                block.reset();
                if (click == this.lastClick && !isSelect) {
                    continue;
                }
                // dim所在的十字格
                this.dimCrossColor(block, viewRow, viewCol);
                // 选中所处的九宫格
                if (click.nonetId == i + 1) {
                    block.setBlockColor(BlockColor.Gray);
                }
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
        click.hasSelect = isSelect;
        this.lastClick = click;
    }

    private dimCrossColor(block: ClickBlock, row: number, col: number): void {
        if (block.row == row) {
            block.setBlockColor(BlockColor.Gray);
        }
        if (block.col == col) {
            block.setBlockColor(BlockColor.Gray);
        }
    }
}


