import { _decorator, Component, Node } from 'cc';
import { ClickRegion } from '../game/ClickRegion';
import { UIView } from '../../../script/framework/ui/UIView';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { SelectRegion } from '../game/SelectRegion';
const { ccclass, property } = _decorator;

@ccclass('GamePanel')
export class GamePanel extends UIView {

    @property(ClickRegion)
    clickRegion: ClickRegion = null;
    @property(SelectRegion)
    selectRegion: SelectRegion = null;

    start() {
        this.clickRegion.init(1);
        this.selectRegion.init();
    }
}
UIManager.instance.register(GamePanel);


