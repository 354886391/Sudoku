import { Node } from "cc";

export abstract class Entry {

    public isRunning: boolean = false;

    public node: Node = null;
    /** 当前bundle名,由管理器指定 */
    public bundle: string = "";

    init(node: Node): void {
        this.node = node;
        this.isRunning = true;
    }

    onDestroy(): void {
        this.isRunning = false;
    }

    onLoad(): void {

    }
}