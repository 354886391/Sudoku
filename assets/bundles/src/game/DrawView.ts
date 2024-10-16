import { _decorator, Component, Graphics, instantiate, Layout, Node, Prefab } from 'cc';
import { ClickRect } from './ClickRect';
import { GameState } from '../data/GameState';
const { ccclass, property } = _decorator;

@ccclass('DrawView')
export class DrawView extends Component {

    @property(Graphics)
    draw: Graphics = null;

    

    protected start(): void {
        this.draw.lineWidth = 1;
        this.draw.moveTo(-523, 540);
        this.draw.lineTo(523, 540);
        this.draw.lineTo(-523, -501);
        this.draw.lineTo(523, -501);
        this.draw.lineTo(-523, 540);
        // this.draw.rect(-523, 540, 1046, 1046);
    }
    
}


