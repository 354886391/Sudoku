import { _decorator, Node, Component, Enum } from 'cc';
import { UIView } from '../UIView';
import { IUILayer, UILayer, UIManager } from '../UIManager';
const { ccclass, property } = _decorator;

@ccclass
export class UINoticeLayer extends IUILayer {

    @property({ type: Enum(UILayer), tooltip: "层级枚举", readonly: true })
    layerIndex: UILayer = UILayer.notice;
    @property(Node)
    maskNode: Node = null;

    // protected __preload(): void {
    //     UIManager.instance.addLayer(this.type, this);
    // }
    
    // addView(view: UIView): void {
    //     throw new Error('Method not implemented.');
    // }
}
