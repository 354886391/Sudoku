import { _decorator, Color, Component, Label, Sprite } from 'cc';
import { Eventer } from '../../../../script/framework/tool/Eventer';
import { UIButton } from '../../../../script/framework/ui/group/UIButton';
import { BlockColor } from '../../data/GameConst';
import { BlockInfo, BlockType } from '../../data/GameData';
import { GameEvents } from '../../data/GameEvent';

const { ccclass, property } = _decorator;

export const BLANK = '.';

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

    public setValue(type: BlockType, value: string): void {
        this.blockInfo.type = type;
        this.blockInfo.value = value;
        this.blockLbl.string = `${value}`;
    }

    public setBlockColor(str: string): void {
        this.blockBtn.getComponent(Sprite).color = new Color().fromHEX(str);
    }
    
    public setValueColor(str: string): void {
        this.blockLbl.color = new Color().fromHEX(str);
    }

    public onClicked(): void {
        Eventer.emit(GameEvents.ON_BLOCK_CLICK, this);
    }

    public reset(): void {
        this.blockInfo.isSelect = false;
        this.setValueColor(BlockColor.Black);
        this.setBlockColor(BlockColor.White);
    }

    //getter / setter
    get id() {
        return this.blockInfo.id;
    }

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

    set value(value: string) {
        this.blockInfo.value = value;
    }

    get isSelect() {
        return this.blockInfo.isSelect;
    }

    set isSelect(value: boolean) {
        this.blockInfo.isSelect = value;
    }

    get isValid() {
        return this.blockInfo.type == BlockType.Right || this.blockInfo.type == BlockType.Lock;
    }

}


