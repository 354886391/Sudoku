import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { OptionCom } from './com/OptionCom';
import { BlockColor } from '../data/GameConst';

const { ccclass, property } = _decorator;

@ccclass
export class OptionView extends Component {

    @property(Prefab)
    blockPrefab: Prefab = null;

    optionList: OptionCom[] = [];

    layout: Layout = null;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
    }

    public init(): void {
        for (let i = 0; i < 9; i++) {
            let node = instantiate(this.blockPrefab);
            let block = node.getComponent(OptionCom);
            node.setParent(this.node);
            block.init(i + 1, i + 1);
            this.optionList.push(block);
            // 更新layout布局
            this.layout.updateLayout();
        }
    }

    /** highlight点击的option格子 */
    public highlightOptionColor(click: OptionCom): void {
        if (click.hasSelect) {
            click.hasSelect = false;
            click.setValueColor(BlockColor.Black);
            click.setBlockColor(BlockColor.White);

        } else {
            click.hasSelect = true;
            click.setValueColor(BlockColor.Gold);
            click.setBlockColor(BlockColor.Blue);
        }
    }

    public reset(): void {
        for (let i = 0; i < this.optionList.length; i++) {
            this.optionList[i].reset();
        }
    }
}


