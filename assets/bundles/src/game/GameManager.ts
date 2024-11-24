import { _decorator, Component, Node } from 'cc';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GobeEvents } from '../../../script/network/GobeEvents';
import { GobeManager } from '../../../script/network/GobeManager';
import { PlayerData } from '../data/PlayerData';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { SelectPanel } from '../panel/SelectPanel';
import { HintDialog } from '../panel/dialog/HintDialog';

const { ccclass, property } = _decorator;

@ccclass
export class GameManager extends Component {

    protected start(): void {
        
    }

    protected onEnable(): void {
        Eventer.on(GobeEvents.ON_GAME_READY, this.onGameReady, this);
        Eventer.on(GobeEvents.ON_GAME_321, this.onGame321, this)
        Eventer.on(GobeEvents.ON_GAME_START, this.onGameStart, this);
        Eventer.on(GobeEvents.ON_GAME_END, this.onGameEnd, this);
    }

    protected onDisable(): void {
        Eventer.offHandler(GobeEvents.ON_GAME_READY, this.onGameReady);
        Eventer.offHandler(GobeEvents.ON_GAME_321, this.onGame321)
        Eventer.offHandler(GobeEvents.ON_GAME_START, this.onGameStart);
        Eventer.offHandler(GobeEvents.ON_GAME_END, this.onGameEnd);
    }

    loginGame(){
        // 登录
        let playerId = PlayerData.instance.playerInfo.pid;
        GobeManager.instance.initSDK(playerId, (successInit: boolean)=>{
            if (successInit) {
               // 登录成功
               UIManager.instance.open(SelectPanel);
            }else{
                // 登录失败
                UIManager.instance.open(HintDialog, "登录失败");
            }
        });
    }

    init() {

    }

    onGameReady() {

    }

    onGame321() {

    }

    onGameStart() {

    }

    onGameEnd() {

    }

}


