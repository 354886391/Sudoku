import { _decorator, Color, Component, Label, Sprite } from 'cc';
import { Eventer } from '../../../../script/framework/tool/Eventer';
import { UIButton } from '../../../../script/framework/ui/group/UIButton';
import { BlockColor } from '../../data/GameConst';
import { BlockInfo, BlockType } from '../../data/GameData';
import { GameEvents } from '../../data/GameEvent';

const { ccclass, property } = _decorator;

@ccclass
export class BlockCom extends Component {

    @property(Sprite)
    blockBg: Sprite = null;
    @property(Label)
    blockLbl: Label = null;
    @property(UIButton)
    blockBtn: UIButton = null;

    nonetId: number = 0;    // 九宫格Id
    blockInfo: BlockInfo;   // 方格信息

    protected onLoad(): void {
        this.blockBtn.touchBeganFun = this.onClicked.bind(this);
    }

    public init(nonetId: number, blockInfo: BlockInfo): void {
        this.nonetId = nonetId;
        this.blockInfo = blockInfo;
        this.setValue(blockInfo.type, blockInfo.value);
        this.node.name = `${this.nonetId}-${blockInfo.id}`;
    }

    public setBlock(nonetId: number, blockInfo: BlockInfo): void {
        this.nonetId = nonetId;
        this.blockInfo = blockInfo;
        this.setValue(blockInfo.type, blockInfo.value);
    }

    public setValue(type: BlockType, value: number): void {
        if (type == BlockType.Blank) {
            this.blockInfo.value = 0;
            this.blockLbl.string = ``;
        } else {
            this.blockInfo.value = value;
            this.blockLbl.string = `${value}`;
        }
    }

    public clearValue(): void {
        if (this.blockInfo.type != 1) {
            this.blockLbl.string = ``;
        }
    }

    public setBlockColor(str: string): void {
        this.blockBtn.getComponent(Sprite).color = new Color().fromHEX(str);
    }
    public setValueColor(str: string): void {
        this.blockLbl.color = new Color().fromHEX(str);
    }

    private calcRowCol(nIndex: number, bIndex: number): void {
        this.blockInfo.row = Math.trunc(nIndex / 3) * 3 + Math.trunc(bIndex / 3);
        this.blockInfo.col = nIndex % 3 * 3 + bIndex % 3;
    }

    public onClicked(): void {
        Eventer.emit(GameEvents.OnClickBlock, this);
    }

    public reset(): void {
        this.blockInfo.isSelect = false;
        this.setValueColor(BlockColor.Black);
        this.setBlockColor(BlockColor.White);
    }

    //getter / setter
    get blockId() {
        return this.blockInfo.id;
    }

    /** 0: 空白, 1: 静态,  2: 候选, 3: 错误 */
    get type() {
        return this.blockInfo.type;
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

    set value(value: number) {
        this.blockInfo.value = value;
    }

    get isSelect() {
        return this.blockInfo.isSelect;
    }

    set isSelect(value: boolean) {
        this.blockInfo.isSelect = value;
    }


}


