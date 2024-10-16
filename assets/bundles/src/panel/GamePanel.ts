import { _decorator, Component, Node } from 'cc';
import { ClickView } from '../game/ClickView';
import { UIView } from '../../../script/framework/ui/UIView';
import { UIManager } from '../../../script/framework/ui/UIManager';
const { ccclass, property } = _decorator;

@ccclass('GamePanel')
export class GamePanel extends UIView {

    @property(ClickView)
    clickView: ClickView = null;

    start() {
        this.clickView.init();
    }
}
UIManager.instance.register(GamePanel);


