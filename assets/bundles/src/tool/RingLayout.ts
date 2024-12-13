import { _decorator, Component, Node, Vec3, CCFloat, Label, Prefab } from 'cc';
import { PoolManager } from 'db://assets/script/framework/manager/PoolManager';
import { ResourceManager } from 'db://assets/script/framework/resources/ResourceManager';
import { RES_GAME } from '../data/GameConfig';

const { ccclass, property } = _decorator;

@ccclass
export class RingLayout extends Component {

    @property(CCFloat)
    radius: number = 150;

    nodeList: Node[] = [];

    addItem(char: string) {
        let lblPrefab = ResourceManager.getBy<Prefab>(RES_GAME.lblPrefab);
        let node = PoolManager.instance.getNode(lblPrefab, this.node);
        node.getComponent(Label).string = char;
        this.nodeList.push(node);
        this.updateRingLayout();
    }

    removeItem(index: number) {
        if (index >= 0 && index < this.nodeList.length) {
            PoolManager.instance.putNode(this.nodeList[index]);
            this.nodeList.splice(index, 1);
            this.updateRingLayout();
        }
    }

    updateRingLayout() {
        const center = new Vec3(this.node.position.x, this.node.position.y, 0);
        for (let i = 0; i < this.nodeList.length; i++) {
            // 调整起始角度为90度（π/2弧度）
            const angle = (i / this.nodeList.length) * Math.PI * 2 - Math.PI / 2;
            const x = center.x + this.radius * Math.cos(angle);
            const y = center.y + this.radius * Math.sin(angle);
            this.nodeList[i].setPosition(new Vec3(x, y, 0));
        }
    }
}