export class MSequence {

    private _head: ITask;
    private _tail: ITask;

    public get isDone() {
        return this._head.isDone;
    }

    public update(dt: number): void {
        if (this._head && this._head.isDone) {
            this._head = this._head.nextTask;
            this._head?.execute();
        }
        this._head?.onUpdate(dt);
    }

    /** 添加一个方法节点 */
    public append(callback: Function, thisArg?: any): MSequence {
        this.addNode(new EventTask(callback, thisArg));
        return this;
    }

    /** 添加一个时间节点 */
    public interval(duration: number): MSequence {
        this.addNode(new IntervalTask(duration));
        return this;
    }

    public begin(): void {
        this._head.execute();
    }

    /** 清空所有节点 */
    public clear(): void {
        if (this._head) {
            this._head = null!;
        }
        if (this._tail) {
            this._tail = null!;
        }
    }

    private addNode(task: ITask): void {
        if (this._head == null) {
            // 头节点            
            this._head = this._tail = task;
        }
        else {
            // 后继节点
            this._tail = this._tail.nextTask = task;
        }
    }
}

interface ITask {
    isDone: boolean;
    context: any[];      // 传递内容
    nextTask: ITask;    // 下个任务

    execute(): void;

    onUpdate(dt: number): void;
}

class EventTask implements ITask {

    isDone: boolean;
    context: any[];
    nextTask: ITask;

    thisArg: any;
    callback: Function;

    constructor(callback: Function, thisArg: any) {
        this.isDone = false;
        this.thisArg = thisArg;
        this.callback = callback;
    }

    execute(): void {
        this.isDone = true;
        this.callback.call(this.thisArg);
    }

    onUpdate(dt: number): void {

    }
}

class IntervalTask implements ITask {

    isDone: boolean;
    context: any[];
    nextTask: ITask;

    duration: number;

    constructor(duration: number) {
        this.isDone = false;
        this.duration = duration;
    }

    execute(): void {
        this.isDone = false;
    }

    onUpdate(dt: number): void {
        if (this.duration > 0) {
            this.duration -= dt;
            return;
        }
        this.isDone = true;
    }
}

