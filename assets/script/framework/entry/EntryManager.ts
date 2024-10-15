import { Entry } from "./Entry";
import { Singleton } from "../util/Singleton";
import { Node } from "cc";

export class EntryManager extends Singleton<EntryManager>() {
    private logTag = "[EntryManager] : ";

    private isInGame: boolean = false;

    private node: Node = null;

    private entryMap: Map<string, Entry> = new Map();

    init(node: Node) {
        this.node = node;
        this.entryMap.forEach((entry, key) => {
            if (!entry.isRunning) {
                entry.init(this.node);
            }
        });
    }

    onLoad(bundle: string) {
        this.isInGame = true;
        //通知入口管理进入bundle
        let entry = this.getEntry(bundle);
        if (entry) {
            entry.onLoad();
        }
    }

    onDestroy() {
        this.isInGame = false;
    }

    /** 注册入口 */
    register(entryClass: BaseEntry<Entry>) {
        let entry = this.getEntry(entryClass.bundle);
        if (entry) {
            this.entryMap.delete(entryClass.bundle);
        }
        entry = new entryClass();
        entry.bundle = entryClass.bundle;
        this.entryMap.set(entry.bundle, entry);
        console.debug(`${this.logTag}====register==${entry.bundle},${entry}========`);
        if (this.node) {
            entry.init(this.node);
        }
    }

    /** 获取bundle入口 */
    getEntry(bundleName: string) {
        let entry = this.entryMap.get(bundleName);
        if (entry) {
            return entry;
        }
        return null;
    }
}