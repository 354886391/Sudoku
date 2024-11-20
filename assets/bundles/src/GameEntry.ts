import { Node } from "cc";
import { Entry } from "../../script/framework/entry/Entry";
import { EntryManager } from "../../script/framework/entry/EntryManager";
import { UIManager } from "../../script/framework/ui/UIManager";
import { Global } from "../../script/Global";
import { UI_GAME } from "./data/GameConfig";
import { GamePanel } from "./panel/GamePanel";

export class GameEntry extends Entry {

    public static bundle = Global.SUB_BUNDLE;

    init(node: Node): void {
        Log.w("GameEntry--> onLoad: ", node.name);
        
    }

    onLoad(): void {
        Log.w("GameEntry--> onEnter: ", this.bundle);
        this.showGamePanel();
    }

    showGamePanel(){
        UIManager.instance.init(UI_GAME);
        UIManager.instance.open(GamePanel);
    }
}
EntryManager.instance.register(GameEntry);