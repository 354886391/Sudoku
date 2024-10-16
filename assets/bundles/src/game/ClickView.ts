import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { ClickRect } from './ClickRect';
import { GameState } from '../data/GameState';
const { ccclass, property } = _decorator;

@ccclass('ClickView')
export class ClickView extends Component {

    @property(Prefab)
    rectPrefab: Prefab = null;

    layout: Layout = null;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
    }

    public init(): void {
        this.generateView();
    }

    private generateView(): void {
        let map = GameState.gameData.map;
        for (const key in map) {
            if (map.hasOwnProperty(key)) {
                let rectId = Number(key);
                this.createRect(rectId, this.node);
            }
        }
    }

    /**
     * 创建矩形
     */
    private createRect(rectId: number, parent: Node) {
        let node = instantiate(this.rectPrefab);
        let rect = node.getComponent(ClickRect);
        node.setParent(parent);
        rect.init(rectId);
        // 更新layout布局
        this.layout.updateLayout();
    }

}


