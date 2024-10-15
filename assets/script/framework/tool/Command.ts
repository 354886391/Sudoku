class Command {

    private _run: boolean = false;
    private _head: ICommand = null;
    private _tail: ICommand = null;

    private _data: any = null;

    public get isDone() {
        return this._tail.isDone;
    }

    public create(data: any): void {
        this._data = data;
    }

    /** 轮询命令是否完成, 并跳转到下一个节点 */
    public update(dt: number): void {
        if (this._run && this._head) {
            if (this._head.isDone) {
                this._head = this._head.next;
                this._head?.execute();
            }
        }
    }

    /** 添加一个任务节点 */
    public append(command: ICommand): Command {
        command.data = this._data;
        if (this._head == null) {
            this._head = this._tail = command;
        } else {
            this._tail = this._tail.next = command;
        }
        return this;
    }

    public start(): void {
        this._run = true;
    }

    /** 清空所有节点 */
    public clear(): void {
        this._run = false;
        this._head = null;
        this._tail = null;
    }
}

export abstract class ICommand {

    public data: any;
    public next: ICommand;
    public isDone: boolean;

    abstract execute(): void;
}

export default new Command();