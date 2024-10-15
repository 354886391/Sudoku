import { _decorator, Animation, Component, Label, Node, Sprite } from 'cc';
import { Eventer } from '../../../script/framework/tool/Eventer';
const { ccclass, property } = _decorator;

@ccclass('ClickItem')
export class ClickItem extends Component {

    @property(Sprite)
    itemBg: Sprite = null;
    @property(Label)
    itemLabel: Label = null;

    @property(Animation)
    clickAni: Animation = null;

    id: number = 0;
    row: number = 0;
    col: number = 0;


    public init(id: number): void {
        this.id = id;
        this.setLabel(id);
    }

    private setLabel(id: number) {
        this.itemLabel.string = `${id}`;
    }

    private clearLabel(): void {
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


