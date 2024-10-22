import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { SelectBlock } from '../SelectBlock';
import { Eventer } from '../../../../script/framework/tool/Eventer';
import { GameEvent } from '../../data/GameEvent';

const { ccclass, property } = _decorator;

@ccclass('SelectCom')
export class SelectCom extends Component {

    @property(Prefab)
    blockPrefab: Prefab = null;

    blockList: SelectBlock[] = [];

    layout: Layout = null;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
    }

    public init(): void {
        for (let i = 0; i < 9; i++) {
            let node = instantiate(this.blockPrefab);
            let block = node.getComponent(SelectBlock);
            node.setParent(this.node);
            block.init(i + 1, i + 1);
            this.blockList.push(block);
            // 更新layout布局
            this.layout.updateLayout();
        }
    }
}


