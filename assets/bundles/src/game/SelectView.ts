import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('SelectView')
export class SelectView extends Component {

    @property(Prefab)
    nonetPrefab: Prefab = null;

    layout: Layout = null;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
    }

    public init(): void {
        
    }

}


