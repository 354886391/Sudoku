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


    public init() {
        for (let i = 0; i < 9; i++) {
            let optionId = i + 1;
            if (this.optionList[i]) {
                this.setOption(optionId);
            } else {
                this.createOption(optionId)
            }
        }
    }

    public setOption(optionId: number) {
        this.optionList[optionId - 1].init(optionId, `${optionId}`);
    }

    public createOption(optionId: number): void {
        let node = instantiate(this.optionPrefab);
        node.parent = this.node;
        let option = node.getComponent(OptionCom);
        option.init(optionId, `${optionId}`);
        this.optionList.push(option);
    }

    /** highlight点击的格子 */
    public highlightClickColor(click: OptionCom): void {
        if (click.hasSelect) {
            click.hasSelect = false;
            click.setResultColor(BlockColor.Black);
            click.setBlockColor(BlockColor.White);
            this.curClick = null;

        } else {
            click.hasSelect = true;
            click.setResultColor(BlockColor.LightGold);
            click.setBlockColor(BlockColor.LightCyan);
            this.curClick = click;
        }
    }

    public getOption(optionId: number): OptionCom {
        return optionId >= 1 && optionId <= 9 ? this.optionList[optionId - 1] : null;
    }

    public reset(): void {
        for (let i = 0; i < this.optionList.length; i++) {
            this.optionList[i].reset();
        }
    }
}


