import { _decorator, Animation, Color, Component, Label, Node, Sprite } from 'cc';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GameEvent } from '../data/GameEvent';
import { UIButton } from '../../../script/framework/ui/group/UIButton';
import { BlockColor } from '../data/GameConst';
const { ccclass, property } = _decorator;

@ccclass('ClickBlock')
export class ClickBlock extends Component {

    @property(Sprite)
    itemBg: Sprite = null;
    @property(Label)
    itemLabel: Label = null;
    @property(UIButton)
    blockBtn: UIButton = null;

    @property(Animation)
    clickAni: Animation = null;

    blockId: number = 0;
    nonetId: number = 0;
    blockVal: number = 0;
    row: number = 0;
    col: number = 0;

    hasSelect: boolean = false;

    protected onLoad(): void {
        this.blockBtn.touchBeganFun = this.onClicked.bind(this);
    }

    public init(nonetId: number, blockId: number, blockVal: number): void {
        this.nonetId = nonetId;
        this.blockId = blockId;
        this.blockVal = blockVal;
        this.calcRowCol(nonetId - 1, blockId - 1);
        this.setValue(blockVal > 0 ? `${blockVal}` : "");
    }

    public setValue(str: string) {
        this.itemLabel.string = str;
    }

    public clearValue(): void {
        this.itemLabel.string = "";
    }

    public setValColor(str: string): void {
        this.itemLabel.color = new Color().fromHEX(str);
    }

    public setBlockColor(str: string): void {
        this.blockBtn.getComponent(Sprite).color = new Color().fromHEX(str);
    }

    private calcRowCol(nIndex: number, bIndex: number): void {
        this.row = Math.trunc(nIndex / 3) * 3 + Math.trunc(bIndex / 3);
        this.col = nIndex % 3 * 3 + bIndex % 3;
    }

    public onClicked(): void {
        // this.clickAni.play();
        Eventer.emit(GameEvent.OnClickBlock, this);
    }

    public reset(): void {
        this.hasSelect = false;
        this.setValColor(BlockColor.Black);
        this.setBlockColor(BlockColor.White);
    }
}


