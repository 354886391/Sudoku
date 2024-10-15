import { _decorator, Component, PhysicsSystem, profiler, game } from 'cc';
import { StorageManager } from './framework/manager/StorageManager';
import { UI_ROOT } from './framework/data/MainConfig';
import { UIManager } from './framework/ui/UIManager';
import { StartPanel } from './StartPanel';
import { Global } from './Global';

const { ccclass, property } = _decorator;

@ccclass('StartEntry')
export class StartEntry extends Component {

    protected onLoad(): void {
        this.setFrameRate();
        this.setDebugStats();
        this.showStartView();
    }

    setFrameRate(): void {
        let frameRate = StorageManager.instance.getGlobalData("frameRate");
        if (typeof frameRate !== "number") {
            frameRate = Global.GAME_FRAME;
            //@ts-ignore
            if (window.wx && Util.checkIsLowPhone()) {
                frameRate = 30;
            }
            StorageManager.instance.setGlobalData("frameRate", frameRate);
        }
        console.log("###frameRate", frameRate);
        game.frameRate = frameRate;
        PhysicsSystem.instance.fixedTimeStep = 1 / frameRate;
    }

    setDebugStats(): void {
        let isDebugOpen = StorageManager.instance.getGlobalData("debug") ?? false;
        isDebugOpen === true ? profiler.showStats() : profiler.hideStats();
    }

    showStartView(){
        UIManager.instance.init(UI_ROOT);
        UIManager.instance.open(StartPanel);
        Global.LOGIN_TIME = Date.now();
    }
}