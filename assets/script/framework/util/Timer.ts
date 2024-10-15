export class Timer {
    private static timerList: TimerInfo[] = [];
    private static clearList: number[] = [];
    private static timerID = 0;
    private static curTime = 0;

    /**
     * 定时器
     * @param caller 回调对象
     * @param callback 回调方法
     * @param delay 延迟  ms
     * @param args 回调参数
     * @param repeat 重复次数 默认1次
     * @param interval 之后重复时间隔时间  ms
     */
    public static setTimeOut(caller: any, callback: Function, delay: number, args?: any, repeat = 1, interval = 0) {
        this.timerID++;
        let timer = new TimerInfo(this.timerID, this.curTime, caller, callback, delay / 1000, args, repeat, interval / 1000);
        this.timerList.push(timer);
        return this.timerID;
    }

    /**
     * 清除定时器
     * @param id 定时器id, 传数值则删除对应id定时器，否则清除所有
     */
    public static clearTimeOut(id?: number) {
        if (typeof id != "number") {
            id = -1;
        }
        this.clearList.push(id);
    }

    public static update(deltaTime: number) {
        this.curTime += deltaTime;
        if (this.clearList.length > 0) {
            //清除队列缓存
            for (let id of this.clearList) {
                if (id == -1) {
                    this.timerList.length = 0;
                    break;
                }
                for (let i = this.timerList.length - 1; i >= 0; i--) {
                    if (this.timerList[i].id == id) {
                        this.timerList.splice(i, 1);
                        break;
                    }
                }
            }
            this.clearList.length = 0;
        }

        //执行刷新
        for (let timer of this.timerList) {
            timer.update(this.curTime);
        }
    }

    public static reset() {
        this.timerList = [];
        this.clearList = [];
        this.timerID = 0;
        this.curTime = 0;
    }

}

export class TimerInfo {
    /**回调对象 */
    private _caller: any;
    /**回调方法 */
    private _callback: Function;
    /**延迟时长 ms */
    private _delay: number;
    /**回调方法参数 */
    private _args: any;
    /**重复次数 0:循环，大于0则为次数 */
    private _repeat: number;
    /**重复间隔 */
    private _interval: number;

    private _id: number;
    private _startTime: number;
    private _repeatCount: number;

    public get id() {
        return this._id;
    }

    public constructor(id: number, startTime: number, caller: any, callback: Function, delay: number,
        args: any, repeat: number, interval: number) {
        this._id = id;
        this._startTime = startTime;
        this._caller = caller;
        this._callback = callback;
        this._delay = delay;
        this._args = args;
        this._repeat = repeat;
        this._interval = interval;

        this._repeatCount = 0;
    }

    public update(curTime: number) {
        if (this._startTime + this._delay <= curTime) {
            this._callback.call(this._caller, this._args);
            this._repeatCount++;
            if (this._repeat <= 0 || this._repeatCount < this._repeat) {  //循环执行
                this._startTime = curTime;
                if (this._interval > 0) {
                    this._delay = this._interval;
                }
            } else {  //清除定时器
                Timer.clearTimeOut(this._id);
            }
        }
    }
}