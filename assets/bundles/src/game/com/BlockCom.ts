import { _decorator, Color, Component, Label, Prefab, Sprite } from 'cc';
import { Eventer } from '../../../../script/framework/tool/Eventer';
import { UIButton } from '../../../../script/framework/ui/group/UIButton';
import { BlockColor } from '../../data/GameConst';
import { BlockInfo, BLOCK_TYPE } from '../../data/GameDefine';
import { GameEvents } from '../../data/GameEvent';
import { RingLayout } from '../../tool/RingLayout';

const { ccclass, property } = _decorator;

export const BLANK = ' ';

@ccclass
export class BlockCom extends Component {

    @property(Sprite)
    blockBg: Sprite = null;
    @property(Label)
    blockLbl: Label = null;
    @property(UIButton)
    blockBtn: UIButton = null;

    @property(RingLayout)
    ringLayout: RingLayout = null;

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

    public setBlock(info: BlockInfo): void {
        this.blockInfo = info;
        this.setResult(info.type, info.result);
    }

    public setBlockColor(color: string): void {
        this.blockBg.color = new Color().fromHEX(color);
    }

    public setResult(type: BLOCK_TYPE, value: string): void {
        this.blockInfo.type = type;
        this.blockInfo.result = value;
        this.blockLbl.string = `${value}`;
    }


    public setResultColor(color: string): void {
        this.blockLbl.color = new Color().fromHEX(color);
    }

    /** 设置提示词 */
    public setCandidate(candidate: string): void {
        let nodeList = this.ringLayout.nodeList;
        let maxCount = Math.max(nodeList.length, candidate.length);
        for (let i = 0; i < maxCount; i++) {
            if (i < candidate.length) {
                let char = candidate.charAt(i);
                this.ringLayout.addItem(char);
            } else {
                this.ringLayout.removeItem(i);
            }
        }
    }

    public onClicked(): void {
        Eventer.emit(GameEvents.ON_BLOCK_CLICK, this);
    }

    public reset(): void {
        this.blockInfo.isSelect = false;
        this.setResultColor(BlockColor.Black);
        this.setBlockColor(BlockColor.White);
        this.setCandidate("");
    }

    //getter / setter
    get id() {
        return this.blockInfo.id;
    }

    get type() {
        return this.blockInfo.type;
    }

    set type(value: BLOCK_TYPE) {
        this.blockInfo.type = value;
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

    get isSelect() {
        return this.blockInfo.isSelect;
    }

    set isSelect(value: boolean) {
        this.blockInfo.isSelect = value;
    }

    /** 是否正确 */
    get IsCorrect() {
        return this.blockInfo.type == BLOCK_TYPE.Right || this.blockInfo.type == BLOCK_TYPE.Lock;
    }
}


