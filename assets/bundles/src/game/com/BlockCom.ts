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

    protected onLoad() {
        this.blockBtn.touchBeganFun = this.onClicked.bind(this);
    }

    public init(nonetId: number, info: BlockInfo) {
        this.nonetId = nonetId;
        this.blockInfo = info;
        this.setResult(info.status, info.result);
        this.node.name = `${this.nonetId}-${info.id}`;
    }

    public setResult(type: BLOCK_TYPE, value: string) {
        this.blockInfo.status = type;
        this.blockInfo.result = value;
        this.blockLbl.string = `${value}`;
    }

    /** 设置提示词 */
    public setCandidate(candidate: string) {
        let nodeList = this.ringLayout.nodeList;
        let maxCount = Math.max(nodeList.length, candidate.length);
        for (let i = maxCount - 1; i >= 0; i--) {
            if (i >= candidate.length) {
                this.ringLayout.removeItem(i);
            } else {
                this.ringLayout.addItem(candidate.charAt(i));
            }
        }
    }

    public setBlockColor(color: string) {
        this.blockBg.color = new Color().fromHEX(color);
    }

    public setResultColor(color: string) {
        this.blockLbl.color = new Color().fromHEX(color);
    }

    public onClicked() {
        Eventer.emit(GameEvents.ON_BLOCK_CLICK, this);
    }

    public resetBlock() {
        this.blockInfo.isSelect = false;
        this.setCandidate("");
        this.resetColor();
    }

    public resetBlockBy(status: number, result: string) {
        this.blockInfo.isSelect = false;
        this.setResult(status, result);
        this.setCandidate("");
        this.resetColor();
    }

    public resetColor() {
        this.setResultColor(BlockColor.Black);
        this.setBlockColor(BlockColor.White);
    }

    //getter / setter
    get id() {
        return this.blockInfo.id;
    }

    get type() {
        return this.blockInfo.status;
    }

    set type(value: BLOCK_TYPE) {
        this.blockInfo.status = value;
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
        return this.blockInfo.status == BLOCK_TYPE.Right || this.blockInfo.status == BLOCK_TYPE.Lock;
    }
}


