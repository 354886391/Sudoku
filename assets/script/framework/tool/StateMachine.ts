interface IState {
    onEnter: Function;
    onUpdate: Function;
    onExit: Function;
    listener: any;
}

export class StateMachine {
    private _locked: boolean = false;
    private _stateId: number = -1;
    private _stateDic: { [key: number]: IState } = {};

    public get locked() {
        return this._locked;
    }

    public set locked(value: boolean) {
        this._locked = value;
    }

    public get stateId(): number {
        return this._stateId;
    }

    public get listener(): any {
        return this.state.listener;
    }

    public get state(): IState {
        return this._stateDic[this._stateId];
    }

    /** 切换状态 */
    public set state(key: number) {
        if (this.contains(key)) {
            if (this._locked || this._stateId == key) return;   // 锁定或者状态相同禁止切换
            this.state?.onExit?.call(this.listener);
            this._stateId = key;
            this.state?.onEnter?.call(this.listener);
        }
    }

    /** 添加状态 */
    public setCallbacks(key: number, action: { enter?: Function, update?: Function, exit?: Function }, listener: any): void {
        let state: IState = {
            onEnter: action.enter,
            onUpdate: action.update,
            onExit: action.exit,
            listener: listener
        }
        this._stateDic[key] = state;
    }

    public update(dt?: number): void {
        this.state?.onUpdate?.call(this.listener);
    }

    private contains(state: number): boolean {
        return state in this._stateDic;
    }

    public reset(): void {
        this._locked = false;
        this._stateId = -1;
        this._stateDic = {};
    }
}
