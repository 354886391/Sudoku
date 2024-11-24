import { _decorator, Component, PhysicsSystem, profiler, game } from 'cc';
import { StorageManager } from '../framework/storage/StorageManager';
import { UI_ROOT } from './MainConfig';
import { UIManager } from '../framework/ui/UIManager';
import { MainPanel } from './MainPanel';
import { Global } from '../Global';

const { ccclass, property } = _decorator;

@ccclass
export class MainEntry extends Component {

    protected onLoad(): void {
        this.setFrameRate();
        this.setDebugStats();
        this.showMainPanel();
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
        // PhysicsSystem.instance.fixedTimeStep = 1 / frameRate;
    }

    setDebugStats(): void {
        let isDebugOpen = StorageManager.instance.getGlobalData("debug") ?? false;
        isDebugOpen === true ? profiler.showStats() : profiler.hideStats();
    }

    showMainPanel(){
        UIManager.instance.init(UI_ROOT);
        UIManager.instance.open(MainPanel);
        Global.LOGIN_TIME = Date.now();
    }
}