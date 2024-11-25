import { Node } from "cc";
import { Entry } from "../../script/framework/entry/Entry";
import { EntryManager } from "../../script/framework/entry/EntryManager";
import { UIManager } from "../../script/framework/ui/UIManager";
import { Global } from "../../script/Global";
import { RES_GAME, UI_GAME } from "./data/GameConfig";
import { GamePanel } from "./panel/GamePanel";
import { PlayerData } from "./data/PlayerData";
import { Util } from "../../script/framework/util/Util";
import { ResourceManager } from "../../script/framework/resources/ResourceManager";

export class GameEntry extends Entry {

    public static bundle = Global.SUB_BUNDLE;

    init(node: Node): void {
        Log.w("GameEntry--> onLoad: ", node.name);
    }

    onLoad(): void {
        PlayerData.instance.loadFromCache();
        ResourceManager.instance.loadBy(RES_GAME, null, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            this.onCompleteBundle();
        });
        Log.w("GameEntry--> onEnter: ", this.bundle);
    }

    onCompleteBundle(){
        let playerId = PlayerData.instance.playerInfo.pid;
        if (playerId == null) {
            playerId = "cocos" + (new Date().getTime()).toString().substring(6);
            var staticId: number = Math.floor(Math.random() * 2);
            PlayerData.instance.createPlayer({
                pid: playerId,
                name: "",
                avatar: "",
                staticId: staticId
            });
            Util.randomName(staticId).then((playerName) => {
                PlayerData.instance.updatePlayer("name", playerName);
            })
        }
        UIManager.instance.init(UI_GAME);
        UIManager.instance.open(GamePanel);
    }
}
EntryManager.instance.register(GameEntry);