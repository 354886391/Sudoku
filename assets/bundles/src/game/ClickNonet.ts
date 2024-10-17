import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { GameState } from '../data/GameState';
import { ClickBlock } from './ClickBlock';
const { ccclass, property } = _decorator;

@ccclass('ClickNonet')
export class ClickNonet extends Component {

    @property(Prefab)
    itemPrefab: Prefab;

    layout: Layout = null;

    id: number;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
    }

    public init(id: number): void {
        this.id = id;
        this.generateRect(id);
    }

    generateRect(rectId: number): void {
        let list = GameState.gameData.map[rectId];
        for (let i = 0; i < list.length; i++) {
            const itemId = i + 1;
            this.createItem(itemId, list[i], this.node);
        }
    }

    /**
     * 创建子节点
     */
    createItem(id: number, value: number, parent: Node): void {
        let node = instantiate(this.itemPrefab);
        let item = node.getComponent(ClickBlock);
        node.setParent(parent);
        item.init(id, value);
        // 更新layout布局
        this.layout.updateLayout();
    }
}


