interface IState {
    onEnter: Function;
    onUpdate: Function;
    onLeave: Function;
    listener: any;
}

export class StateMachine {
    public locked: boolean = false;
    private _stateId: number = -1;
    private _stateDic: { [key: number]: IState } = {};

    /** 当前状态Id */
    public get state(): number {
        return this._stateId;
    }

    /** 切换状态. (不能在同一帧多次切换状态) */
    public set state(key: number) {
        if (this.contains(key)) {
            if (this.locked || this._stateId == key) return;   // 锁定或者状态相同禁止切换
            this.state2?.onLeave?.call(this.listener);
            this._stateId = key;
            console.warn("current state:", this._stateId);
            this.state2?.onEnter?.call(this.listener);
        }
    }

    /** 绑定的this */
    public get listener(): any {
        return this.state2.listener;
    }
    
    /** 添加状态 */
    public setCallbacks(key: number, action: { enter?: Function, update?: Function, exit?: Function }, listener: any): void {
        let state: IState = {
            onEnter: action.enter,
            onUpdate: action.update,
            onLeave: action.exit,
            listener: listener
        }
        this._stateDic[key] = state;
    }

    public update(dt?: number): void {
        this.state2?.onUpdate?.call(this.listener);
    }

    private contains(state: number): boolean {
        return state in this._stateDic;
    }

    public reset(): void {
        this.locked = false;
        this._stateId = -1;
        this._stateDic = {};
    }
    
    private get state2() {
        return this._stateDic[this._stateId];
    }
}
