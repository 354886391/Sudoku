export class Sequence {

    private _headNode: ActionNode;
    private _tailNode: ActionNode;

    public get isRunning() {
        return this._headNode.isRunning;
    }

    /** 移动到下一个节点 */
    private moveNext(): void {
        if (this._headNode && this._headNode.nextNode) {
            this._headNode = this._headNode.nextNode;
            this._headNode?.start();
        }
    }

    public update(deltaTime: number): void {
        this._headNode?.update(deltaTime, this.moveNext.bind(this));
    }

    /** 先执行 action 再 delay
     * @delay 延时时间 s
     * @loop 0: 无限循环
     */
    public append(action: Function, delay: number = 0, loop: number = 1): Sequence {
        if (!this._headNode) {
            this._headNode = this._tailNode = new ActionNode(action, delay, loop);  //Todo ObjectPool      
        }
        else {
            this._tailNode = this._tailNode.nextNode = new ActionNode(action, delay, loop);
        }
        // this._headNode.start();
        return this;
    }

    public start(): Sequence {
        this._headNode.start();
        return this;
    }

    public stop(): void {
        this._headNode?.stop();
    }

    public pause(): void {
        this._headNode?.pause();
    }

    public resume(): void {
        this._headNode?.resume();
    }

    /** 跳过当前循环中的delay */
    public continue(): void {
        this._headNode?.continue();
    }

    public onUpdate(callback: Function): void {
        this._tailNode?.onUpdate(callback);
    }

    public onComplete(callback: Function): void {
        this._tailNode?.onComplete(callback);
    }

    /** 清空所有节点 */
    public clear(): void {
        if (this._headNode) {
            this._headNode.stop();
            this._headNode = null;
        }
        if (this._tailNode) {
            this._tailNode = null;
        }
    }
}

class ActionNode {
    private _running: boolean = false;
    private _loop: number = 0;      // 循环次数
    private _delay: number = 0;      // 停留时长 s
    private _tempDelay: number = 0;       // 缓存 runTime 初始值

    private _onStart: Function;       // start
    private _onUpdate: Function;
    private _onComplete: Function;

    public nextNode: ActionNode;

    public get isRunning() {
        return this._running;
    }

    constructor(action: Function, delay: number, loop: number) {
        this._running = false;
        this._delay = delay;
        this._loop = loop;
        this._onStart = action;
    }

    /** 节点计时器, 计时完毕后移动到下一个节点 */
    public update(deltaTime: number, moveNext: Function): void {
        if (this._running) {
            if (this._tempDelay <= 0) {
                this._loop--;
                // 当前节点结束进入下一个节点             
                if (this._loop == 0) {
                    this._running = false;
                    this._onComplete?.call(this);
                    moveNext();         // 移到下个节点并开始
                }
                else {
                    this._running = false;
                    this._onComplete?.call(this);
                    this.start();       // 循环节点
                }
            }
            else {
                this._onUpdate?.call(this);
                this._tempDelay = Math.max(this._tempDelay - deltaTime, 0);
            }
        }
    }

    /** 执行 action 方法 并开启计时器 */
    public start(): void {
        if (!this._running) {
            this._running = true;
            this._tempDelay = this._delay;
            this._onStart?.call(this);
        }
    }

    /** 停止当前节点 */
    public stop(): void {
        if (this._running) {
            this._loop = 1;
            this._tempDelay = 0;
            this._running = false;
        }
    }

    /** 跳过等待, 开始下一个节点 */
    public continue(): void {
        if (this._running) {
            this._tempDelay = 0;
        }
    }

    /** 暂停当前节点 */
    public pause(): void {
        this._running = false;
    }

    /** 继续当前节点 */
    public resume(): void {
        this._running = true;
    }

    public onUpdate(callback: Function): void {
        this._onUpdate = callback;
    }

    /** 节点完成回调 */
    public onComplete(callback: Function): void {
        this._onComplete = callback;
    }
}

export class SequenceManager {

    private static _seqList: Sequence[] = [];

    public static update(deltaTime: number): void {
        this._seqList?.forEach(item => {
            item.update(deltaTime);
        });
    }

    public static push(seq: Sequence): void {
        this._seqList?.push(seq);
    }

    public static remove(seq: Sequence): void {
        let index = this._seqList.indexOf(seq);
        if (index >= 0) {
            this._seqList.splice(index, 1);
            seq.clear();
        }
    }

    public static pop(): void {
        let seq = this._seqList?.pop();
        seq.clear();
    }

    public static reset(): void {
        this._seqList = [];
    }
}