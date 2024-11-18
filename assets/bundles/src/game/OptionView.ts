import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { OptionCom } from './com/OptionCom';

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
            block.init(i + 1, String(i + 1));
            this.blockList.push(block);
            // 更新layout布局
            this.layout.updateLayout();
        }
    }
}


