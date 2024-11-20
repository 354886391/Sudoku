import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { OptionCom } from './com/OptionCom';
import { BlockColor } from '../data/GameConst';

const { ccclass, property } = _decorator;

@ccclass
export class OptionView extends Component {

    @property(Prefab)
    blockPrefab: Prefab = null;

    blockList: OptionCom[] = [];

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
            this.blockList.push(block);
            // 更新layout布局
            this.layout.updateLayout();
        }
    }

    public highlightOptionColor(option: OptionCom): void {
        if(option.hasSelect){
            option.hasSelect = false;
            option.setBlockColor(BlockColor.White);
            option.setValueColor(BlockColor.Black);
        }else{
            option.hasSelect = true;
            option.setBlockColor(BlockColor.White);
            option.setValueColor(BlockColor.Black);
        }
    }
}


