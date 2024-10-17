import { _decorator, Animation, Component, Label, Node, Sprite } from 'cc';
import { Eventer } from '../../../script/framework/tool/Eventer';
const { ccclass, property } = _decorator;

@ccclass('ClickBlock')
export class ClickBlock extends Component {

    @property(Sprite)
    itemBg: Sprite = null;
    @property(Label)
    itemLabel: Label = null;

    @property(Animation)
    clickAni: Animation = null;

    id: number = 0;
    value: number = 0;

    public init(id: number, value: number): void {
        this.id = id;
        this.value = value;
        if (value > 0) {
            this.setValue(`${value}`);
        }else{
            this.setValue("");
        }
    }

    private setValue(str: string) {

        this.itemLabel.string = str;
    }

    private clearValue(): void {
        this.itemLabel.string = "";
    }

    private setFrame(id: number): void {

    }

    public onClicked(): void {
        Log.d(`ClickItem ${this.id}`);

        this.clickAni.play();
        Eventer.emit("", this.id);
    }
}


