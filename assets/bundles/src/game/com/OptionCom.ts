import { _decorator, Animation, Color, Component, Label, Node, Sprite } from 'cc';
import { Eventer } from '../../../../script/framework/tool/Eventer';
import { GameEvents } from '../../data/GameEvent';
import { UIButton } from '../../../../script/framework/ui/group/UIButton';
import { BlockColor } from '../../data/GameConst';
const { ccclass, property } = _decorator;

@ccclass
export class OptionCom extends Component {
    
    @property(Label)
    blockLbl: Label = null;
    @property(UIButton)
    blockBtn: UIButton = null;

    id: number = 0;
    row: number = 0;
    col: number = 0;
    value: string = "";

    hasSelect: boolean = false; // 是否选中
    writable: boolean = true;  // 是否可修改

    protected onLoad(): void {
        this.blockBtn.touchBeganFun = this.onClicked.bind(this);
    }

    public init(id: number, value: string): void {
        this.id = id;
        this.value = value;
        this.setValue(value);
    }

    public setValue(value: string) {
        if (this.writable) {
            this.blockLbl.string = `${value}`;
        }
    }

    public setBlockColor(str: string): void {
        this.blockBtn.getComponent(Sprite).color = new Color().fromHEX(str);
    }

    public setValueColor(str: string): void {
        this.blockLbl.color = new Color().fromHEX(str);
    }

    public onClicked(): void {
        Eventer.emit(GameEvents.ON_OPTION_CLICK, this);
    }

    public reset(): void {
        this.hasSelect = false;
        this.setValueColor(BlockColor.Black);
        this.setBlockColor(BlockColor.White);
    }
}


