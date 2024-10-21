import { _decorator, Color, Component, Label, Sprite } from 'cc';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GameEvent } from '../data/GameEvent';
import { UIButton } from '../../../script/framework/ui/group/UIButton';
import { BlockColor } from '../data/GameConst';
import { BlockInfo } from '../data/GameData';
const { ccclass, property } = _decorator;

@ccclass('ClickBlock')
export class ClickBlock extends Component {

    @property(Sprite)
    itemBg: Sprite = null;
    @property(Label)
    itemLabel: Label = null;
    @property(UIButton)
    blockBtn: UIButton = null;

    nonetId: number = 0;    // 九宫格Id
    blockInfo: BlockInfo;   // 方格信息

    protected onLoad(): void {
        this.blockBtn.touchBeganFun = this.onClicked.bind(this);
    }

    public init(nonetId: number, blockId: number, result: number): void {
        this.nonetId = nonetId;
        this.blockInfo = {
            isSelect: false,
            writable: true,
            id: blockId,
            row: 0,
            col: 0,
            value: result,
            result: result,
        }
        this.setValue(result);
        this.setResult(result);
        this.calcRowCol(nonetId - 1, blockId - 1);
    }

    public setValue(value: number): void {
        if (!this.blockInfo.writable) return;
        this.blockInfo.value = value;
        this.itemLabel.string = value > 0 ? `${value}` : ``;
    }

    public setResult(result: number) {
        this.blockInfo.writable = result < 0;
        this.blockInfo.result = result;
        this.itemLabel.string = result > 0 ? `${result}` : ``;
    }

    public clearValue(): void {
        if (this.blockInfo.writable) {
            this.itemLabel.string = ``;
        }
    }

    public setValColor(str: string): void {
        this.itemLabel.color = new Color().fromHEX(str);
    }

    public setBlockColor(str: string): void {
        this.blockBtn.getComponent(Sprite).color = new Color().fromHEX(str);
    }

    private calcRowCol(nIndex: number, bIndex: number): void {
        this.blockInfo.row = Math.trunc(nIndex / 3) * 3 + Math.trunc(bIndex / 3);
        this.blockInfo.col = nIndex % 3 * 3 + bIndex % 3;
    }

    public onClicked(): void {
        Eventer.emit(GameEvent.OnClickBlock, this);
    }

    public reset(): void {
        this.blockInfo.isSelect = false;
        this.setValColor(BlockColor.Black);
        this.setBlockColor(BlockColor.White);
    }

    ////////////
    get blockId() {
        return this.blockInfo.id;
    }

    get row() {
        return this.blockInfo.row;
    }

    get col() {
        return this.blockInfo.col;
    }

    get value() {
        return this.blockInfo.value;
    }

    get result() {
        return this.blockInfo.result;
    }

    get writable() {
        return this.blockInfo.writable;
    }

    get isSelect() {
        return this.blockInfo.isSelect;
    }

    set value(value: number) {
        this.blockInfo.value = value;
    }

    set isSelect(value: boolean) {
        this.blockInfo.isSelect = value;
    }
}


