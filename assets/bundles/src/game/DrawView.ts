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
        let itemWidth = 112;
        //#region 绘制棋盘
        let gapWidth = 4;
        let lineWidth = 6;
        let rectWidth = itemWidth * 3 + gapWidth;
        let viewWidth = rectWidth * 3;

        this.draw.lineWidth = lineWidth;
        // 边
        this.draw.rect(-viewWidth / 2, -viewWidth / 2, viewWidth, viewWidth);
        // 横
        this.draw.rect(-viewWidth / 2, -rectWidth / 2, viewWidth, rectWidth);
        // 竖
        this.draw.rect(-rectWidth / 2, -viewWidth / 2, rectWidth, viewWidth);
        this.draw.stroke();
        //#endregion

        //#region 绘制边框
        let lineWidth2 = 4;
        let pos1 = itemWidth + gapWidth / 2;
        let pos2 = itemWidth + pos1;
        this.draw2.lineWidth = lineWidth2;
        // 横
        this.draw2.rect(-viewWidth / 2,  rectWidth / 2 + pos1, viewWidth, itemWidth);
        this.draw2.rect(-viewWidth / 2, -itemWidth / 2       , viewWidth, itemWidth);
        this.draw2.rect(-viewWidth / 2, -rectWidth / 2 - pos2, viewWidth, itemWidth);
        // 竖
        this.draw2.rect(-rectWidth / 2 - pos2, -viewWidth / 2, itemWidth, viewWidth);
        this.draw2.rect(-itemWidth / 2       , -viewWidth / 2, itemWidth, viewWidth);
        this.draw2.rect( rectWidth / 2 + pos1, -viewWidth / 2, itemWidth, viewWidth);
        this.draw2.stroke();
        //#endregion
    }

}


