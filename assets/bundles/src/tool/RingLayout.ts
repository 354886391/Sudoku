import { _decorator, Component, Node, instantiate, Vec3, EventTouch, CCFloat, Label } from 'cc';

const { ccclass, property } = _decorator;

@ccclass
export class RingLayout extends Component {

    @property(Node)
    itemNode: Node = null;

    @property(CCFloat)
    radius: number = 150;

    private items: Node[] = [];

    start() {
        this.createRingLayout();
    }

    createRingLayout() {
        if (!this.itemNode) {
            console.error('Item prefab is not assigned.');
            return;
        }

        this.items.forEach(item => item.destroy());
        this.items = [];

        this.updateRingLayout();
    }

    addItem(char: string) {
        if (!this.itemNode) {
            console.error('Item prefab is not assigned.');
            return;
        }
        const item = instantiate(this.itemNode);
        item.active = true;
        item.parent = this.node;
        item.name = char;
        item.getComponent(Label).string = char;
        this.items.push(item);
        this.updateRingLayout();
    }

    removeItem(char: string) {
        const index = this.items.findIndex(item => item.name === char);
        if (index !== -1) {
            this.items[index].destroy();
            this.items.splice(index, 1);
            this.updateRingLayout();
        }
    }

    updateRingLayout() {
        if (!this.itemNode) {
            console.error('Item prefab is not assigned.');
            return;
        }
        const center = new Vec3(this.node.position.x, this.node.position.y, 0);
        for (let i = 0; i < this.items.length; i++) {
            // 调整起始角度为90度（π/2弧度）
            const angle = (i / this.items.length) * Math.PI * 2 - Math.PI / 2;
            const x = center.x + this.radius * Math.cos(angle);
            const y = center.y + this.radius * Math.sin(angle);

            this.items[i].setPosition(new Vec3(x, y, 0));
        }
    }
}