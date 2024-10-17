import { _decorator, Component, Graphics, instantiate, Layout, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DrawView')
export class DrawView extends Component {

    @property(Graphics)
    draw: Graphics = null;
    @property(Graphics)
    draw2: Graphics = null;

    gapWidth: number = 4;
    lineWidth: number = 6;
    itemWidth: number = 112;

    protected onLoad(): void {
        this.drawBoard();
    }

    private drawBoard(): void {
        //#region 绘制边框
        let rectWidth = this.itemWidth * 3 + this.gapWidth;
        let viewWidth = rectWidth * 3;
        this.draw.lineWidth = this.lineWidth;
        // 框
        this.draw.rect(-viewWidth / 2, -viewWidth / 2, viewWidth, viewWidth);
        // 横
        this.draw.rect(-viewWidth / 2, -rectWidth / 2, viewWidth, rectWidth);
        // 竖
        this.draw.rect(-rectWidth / 2, -viewWidth / 2, rectWidth, viewWidth);
        this.draw.stroke();
        //#endregion

        //#region 绘制棋盘
        let block1 = this.itemWidth + this.gapWidth / 2;
        let block2 = this.itemWidth * 2 + this.gapWidth / 2;
        this.draw2.lineWidth = this.lineWidth - 2;
        // 横
        this.draw2.rect(-viewWidth / 2, rectWidth / 2 + block1, viewWidth, this.itemWidth);
        this.draw2.rect(-viewWidth / 2, -this.itemWidth / 2, viewWidth, this.itemWidth);
        this.draw2.rect(-viewWidth / 2, -rectWidth / 2 - block2, viewWidth, this.itemWidth);
        // 竖
        this.draw2.rect(-rectWidth / 2 - block2, -viewWidth / 2, this.itemWidth, viewWidth);
        this.draw2.rect(-this.itemWidth / 2, -viewWidth / 2, this.itemWidth, viewWidth);
        this.draw2.rect(rectWidth / 2 + block1, -viewWidth / 2, this.itemWidth, viewWidth);
        this.draw2.stroke();
        //#endregion
    }

}


