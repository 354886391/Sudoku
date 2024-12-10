import { _decorator, Color, Component, Label, Sprite } from 'cc';
import { Eventer } from '../../../../script/framework/tool/Eventer';
import { UIButton } from '../../../../script/framework/ui/group/UIButton';
import { BlockColor } from '../../data/GameConst';
import { BlockInfo, BLOCK_TYPE } from '../../data/GameDefine';
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

    public init(nonetId: number, info: BlockInfo): void {
        this.nonetId = nonetId;
        this.blockInfo = info;
        this.setResult(info.type, info.result);
        this.node.name = `${this.nonetId}-${info.id}`;
    }

    public setBlock(nonetId: number, info: BlockInfo): void {
        this.nonetId = nonetId;
        this.blockInfo = info;
        this.setResult(info.type, info.result);
    }

    public setResult(type: BLOCK_TYPE, value: string): void {
        this.blockInfo.type = type;
        this.blockInfo.result = value;
        this.blockLbl.string = `${value}`;
    }

    public setBlockColor(str: string): void {
        this.blockBtn.getComponent(Sprite).color = new Color().fromHEX(str);
    }
    
    public setResultColor(str: string): void {
        this.blockLbl.color = new Color().fromHEX(str);
    }

    public onClicked(): void {
        Eventer.emit(GameEvents.ON_BLOCK_CLICK, this);
    }

    public reset(): void {
        this.blockInfo.isSelect = false;
        this.setResultColor(BlockColor.Black);
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

    get result() {
        return this.blockInfo.result;
    }

    set result(value: string) {
        this.blockInfo.result = value;
    }

    get isSelect() {
        return this.blockInfo.isSelect;
    }

    set isSelect(value: boolean) {
        this.blockInfo.isSelect = value;
    }

    get IsCorrect() {
        return this.blockInfo.type == BLOCK_TYPE.Right || this.blockInfo.type == BLOCK_TYPE.Lock;
    }

}


