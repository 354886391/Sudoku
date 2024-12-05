import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { OptionCom } from '../com/OptionCom';
import { BlockColor } from '../../data/GameConst';

const { ccclass, property } = _decorator;

@ccclass
export class OptionView extends Component {

    @property(Prefab)
    optionPrefab: Prefab = null;

    curClick: OptionCom = null;
    optionList: OptionCom[] = [];

    public init(): void {
        for (let i = 0; i < 9; i++) {
            let node = instantiate(this.optionPrefab);
            let option = node.getComponent(OptionCom);
            node.setParent(this.node);
            option.init(i + 1, `${i + 1}`);
            this.optionList.push(option);
        }
    }

    /** highlight点击的格子 */
    public highlightClickColor(click: OptionCom): void {
        if (click.hasSelect) {
            click.hasSelect = false;
            click.setValueColor(BlockColor.Black);
            click.setBlockColor(BlockColor.White);
            this.curClick = null;

        } else {
            click.hasSelect = true;
            click.setValueColor(BlockColor.Gold);
            click.setBlockColor(BlockColor.Blue);
            this.curClick = click;
        }
    }

    public getOption(optionId: number): OptionCom {
        return this.optionList[optionId - 1];
    }

    public reset(): void {
        for (let i = 0; i < this.optionList.length; i++) {
            this.optionList[i].reset();
        }
    }
}


