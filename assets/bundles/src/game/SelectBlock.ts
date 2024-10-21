import { _decorator, Animation, Color, Component, Label, Node, Sprite } from 'cc';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GameEvent } from '../data/GameEvent';
import { UIButton } from '../../../script/framework/ui/group/UIButton';
import { BlockColor } from '../data/GameConst';
const { ccclass, property } = _decorator;

@ccclass('SelectBlock')
export class SelectBlock extends Component {

    @property(Sprite)
    itemBg: Sprite = null;
    @property(Label)
    itemLabel: Label = null;
    @property(UIButton)
    blockBtn: UIButton = null;

    blockId: number = 0;
    value: number = 0;
    row: number = 0;
    col: number = 0;

    hasSelect: boolean = false; // 是否选中
    canModify: boolean = true;  // 是否可修改

    protected onLoad(): void {
        this.blockBtn.touchBeganFun = this.onClicked.bind(this);
    }

    public init(blockId: number, blockVal: number): void {
        this.blockId = blockId;
        this.value = blockVal;
        this.setValue(blockVal);
    }

    public setValue(blockVal: number) {
        if (this.canModify) {
            this.itemLabel.string = blockVal > 0 ? `${blockVal}` : ``;
        }
    }

    public setValColor(str: string): void {
        this.itemLabel.color = new Color().fromHEX(str);
    }

    public setBlockColor(str: string): void {
        this.blockBtn.getComponent(Sprite).color = new Color().fromHEX(str);
    }

    public onClicked(): void {
        Eventer.emit(GameEvent.OnSelectBlock, this);
    }

    public reset(): void {
        this.hasSelect = false;
        this.setValColor(BlockColor.Black);
        this.setBlockColor(BlockColor.White);
    }
}


