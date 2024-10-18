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

    curClick: ClickBlock = null;
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
        click.hasSelect = !click.hasSelect;
        for (let i = 0; i < this.nonetList.length; i++) {
            let nonet = this.nonetList[i];
            let blockList = nonet.blockList;
            for (let j = 0; j < blockList.length; j++) {
                let block = blockList[j];
                // 恢复所有格
                block.setValColor(BlockColor.Black);
                block.setBlockColor(BlockColor.White);
                if (click == this.curClick && !click.hasSelect) {
                    continue;
                }
                // 选中所处的行
                if (block.row == viewRow) {
                    block.setBlockColor(BlockColor.Gray);
                }
                // 选中所处的列
                if (block.col == viewCol) {
                    block.setBlockColor(BlockColor.Gray);
                }
            }
        }
        if (click.hasSelect) {
            let blockList = this.nonetList[click.nonetId - 1].blockList;
            // 选中所处的九宫格
            for (let i = 0; i < blockList.length; i++) {
                let block = blockList[i];
                block.setBlockColor(BlockColor.Gray);
            }
            click.setValColor(BlockColor.White);
            click.setBlockColor(BlockColor.Blue);
        }
        else {
            click.setValColor(BlockColor.Black);
            click.setBlockColor(BlockColor.White);
        }
        this.curClick = click;
    }
}


