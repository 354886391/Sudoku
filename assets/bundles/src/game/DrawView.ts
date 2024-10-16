import { _decorator, Component, Graphics, instantiate, Layout, Node, Prefab } from 'cc';
import { ClickRect } from './ClickRect';
import { GameState } from '../data/GameState';
const { ccclass, property } = _decorator;

@ccclass('DrawView')
export class DrawView extends Component {

    @property(Graphics)
    draw: Graphics = null;
    @property(Graphics)
    draw2: Graphics = null;

    oneRectWidth: number = 345;
    halfRectWidth: number = 345 / 2;

    protected start(): void {
        //#region 绘制棋盘
        let OLine = 5;
        let HLine = 5 / 2;
        let ORect = 345;
        let HRect = 345 / 2;
        let OHRect = ORect + HRect;
        let OView = ORect * 3 + OLine * 2;

        this.draw.lineWidth = OLine;
        this.draw.rect(-OHRect - OLine, -OHRect - OLine, OView, OView);

        this.draw.moveTo(-OHRect - OLine, HRect);
        this.draw.lineTo(OHRect + OLine, HRect);

        this.draw.moveTo(-OHRect, -HRect);
        this.draw.lineTo(OHRect, -HRect);

        this.draw.moveTo(-HRect, OHRect);
        this.draw.lineTo(-HRect, -OHRect);

        this.draw.moveTo(HRect, OHRect);
        this.draw.lineTo(HRect, -OHRect);
        this.draw.stroke();
        //#endregion

        this.draw2.lineWidth = 3;
        this.draw2.moveTo(-345 - 57.5, 345 + 57.5);
    }

}


