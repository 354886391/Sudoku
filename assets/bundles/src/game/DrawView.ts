import { _decorator, Component, Graphics, instantiate, Layout, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DrawView')
export class DrawView extends Component {

    @property(Graphics)
    draw: Graphics = null;
    @property(Graphics)
    draw2: Graphics = null;

    gapWidth: number = 4;
    lineWidth: number = 8;
    blockWidth: number = 112;

    protected onLoad(): void {
        this.drawBoard();
    }

    private drawBoard(): void {
        //#region 绘制边框
        let nonetWidth = this.blockWidth * 3 + this.gapWidth;
        let regionWidth = nonetWidth * 3;
        this.draw.lineWidth = this.lineWidth;
        // 框
        this.draw.rect(-regionWidth / 2, -regionWidth / 2, regionWidth, regionWidth);
        // 横
        this.draw.rect(-regionWidth / 2, -nonetWidth / 2, regionWidth, nonetWidth);
        // 竖
        this.draw.rect(-nonetWidth / 2, -regionWidth / 2, nonetWidth, regionWidth);
        this.draw.stroke();
        //#endregion

        //#region 绘制棋盘
        let block1 = this.blockWidth + this.gapWidth / 2;
        let block2 = this.blockWidth * 2 + this.gapWidth / 2;
        this.draw2.lineWidth = this.lineWidth - 2;
        // 横
        this.draw2.rect(-regionWidth / 2, nonetWidth / 2 + block1, regionWidth, this.blockWidth);
        this.draw2.rect(-regionWidth / 2, -this.blockWidth / 2, regionWidth, this.blockWidth);
        this.draw2.rect(-regionWidth / 2, -nonetWidth / 2 - block2, regionWidth, this.blockWidth);
        // 竖
        this.draw2.rect(-nonetWidth / 2 - block2, -regionWidth / 2, this.blockWidth, regionWidth);
        this.draw2.rect(-this.blockWidth / 2, -regionWidth / 2, this.blockWidth, regionWidth);
        this.draw2.rect(nonetWidth / 2 + block1, -regionWidth / 2, this.blockWidth, regionWidth);
        this.draw2.stroke();
        //#endregion
    }

}


