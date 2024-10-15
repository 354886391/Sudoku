import { _decorator } from "cc";
import { EntryManager } from "./framework/entry/EntryManager";
import { BundleManager } from "./framework/resources/BundleManager";
import { UIManager } from "./framework/ui/UIManager";
import { UIView } from "./framework/ui/UIView";
import { Global } from "./Global";

const { ccclass, property } = _decorator;

/** 游戏开始界面 */
@ccclass("StartPanel ")
export class StartPanel extends UIView {

    public init(): void {
        Log.w("StartPanel init");
    }

    protected onLoad(): void {
        Log.w("StartPanel onLoad");
        // 加载subBundle包
        BundleManager.instance.loadBundle(Global.SUB_BUNDLE, this.onEnterBundle.bind(this));
    }

    /** bundle加载完成 */
    private onEnterBundle(): void {
        Log.w("StartPanel onEnterBundle");
        EntryManager.instance.init(this.node);
        this.scheduleOnce(() => {
            EntryManager.instance.onLoad(Global.SUB_BUNDLE);
            UIManager.instance.close(StartPanel);
        }, 1);
    }
}