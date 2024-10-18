import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { GameState } from '../data/GameState';
import { ClickBlock } from './ClickBlock';
const { ccclass, property } = _decorator;

@ccclass('ClickNonet')
export class ClickNonet extends Component {

    @property(Prefab)
    blockPrefab: Prefab;

    blockList: ClickBlock[] = [];

    layout: Layout = null;

    id: number;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
    }

    public init(id: number): void {
        this.id = id;
        this.generate(id);
    }

    /** 生成九宫格 (所有id从1开始; 所有index从0开始) */
    private generate(nonetId: number): void {
        let list = GameState.gameData.map[nonetId];
        for (let i = 0; i < list.length; i++) {
            const blockId = i + 1;
            const blockVal = list[i];
            this.createBlock(nonetId, blockId, blockVal, this.node);
        }
    }

    /** 创建块 (所有id从1开始; 所有index从0开始) */
    private createBlock(nonetId: number, blockId: number, blockVal: number, parent: Node): void {
        let node = instantiate(this.blockPrefab);
        let item = node.getComponent(ClickBlock);
        node.setParent(parent);
        item.init(nonetId, blockId, blockVal);
        this.blockList.push(item);
        // 更新layout布局
        this.layout.updateLayout();
    }
}


