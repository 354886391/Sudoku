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

    protected start(): void {
        //#region 绘制棋盘
        let line_O = 6;             // one
        let line_H = line_O / 2;    // half

        let rect_O = 336;
        let rect_H = rect_O / 2;
        let rect_OH = rect_O * 1.5;

        let space_O = 6;
        let space_H = space_O / 2;
        let view_O = rect_O * 3 + space_O * 2;
        let view_H = view_O / 2;
        
        let viewWidth = view_O + space_O;

        this.draw.lineWidth = line_O;

        this.draw.rect(-(viewWidth/2), -(viewWidth/2), viewWidth, viewWidth);

        this.draw.moveTo(-view_H, rect_H + line_H);
        this.draw.lineTo(view_H, rect_H + line_H);

        this.draw.moveTo(-view_H, -rect_H - line_H);
        this.draw.lineTo(view_H, -rect_H - line_H);

        this.draw.moveTo(-rect_H - line_H, view_H);
        this.draw.lineTo(-rect_H - line_H, -view_H);

        this.draw.moveTo(rect_H + line_H, view_H);
        this.draw.lineTo(rect_H + line_H, -view_H);

        this.draw.stroke();
        //#endregion

        this.draw2.lineWidth = 4;
        this.draw2.moveTo(-345 - 57.5, 345 + 57.5);
    }

}


