
// export type Callback<T = any> = (data?: T) => void;
export type EventObject = { listener: any; handler: Function };
export type EventerDispatchers = Map<string, Array<EventObject>>;

/** 事件分发 */
export class Eventer {

    /** 事件分发数组 */
    private static eventListeners = new Map<string, Array<EventObject>>();

    /** 注册事件 */
    public static on(eventName: string, callback: Function, target?: any): void {
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, []);
        }
        this.eventListeners.get(eventName).push({ listener: target, handler: callback });
    }

    /** 触发事件 */
    public static emit(eventName: string, ...args: any[]): void {
        if (!this.eventListeners.has(eventName)) {
            return;
        }
        let eventObjects = this.eventListeners.get(eventName);
        for (let i = 0; i < eventObjects.length; i++) {
            let dispatcher = eventObjects[i];
            dispatcher.handler.apply(dispatcher.listener, args);
        }
    }

    /** 取消注册 */
    public static off(target: any): void {
        if (target) {
            this.eventListeners.forEach((v, k) => {
                for (let i = 0; i < v.length; i++) {
                    if (v[i].listener == target) {
                        v.splice(i, 1);
                        i--;
                    }
                }
            });
        }
    }

    /** 取消注册 */
    public static offName(eventName: string, target: any): void {
        if (this.eventListeners.has(eventName)) {
            if (target) {
                let eventObjects = this.eventListeners.get(eventName);
                for (let i = 0; i < eventObjects.length; i++) {
                    let dispatcherItem = eventObjects[i];
                    if (target && dispatcherItem.listener == target) {
                        this.eventListeners.get(eventName).splice(i, 1);
                    }
                }
            } else {
                this.eventListeners.delete(eventName);
            }
        }
    }

    /** 取消注册 */
    public static offHandler(eventName: string, handler: Function): void {
        let eventObjects = this.eventListeners.get(eventName);
        if (eventObjects) {
            for (let i = 0; i < eventObjects.length; i++) {
                let dispatcherItem = eventObjects[i];
                if (handler && dispatcherItem.handler == handler) {
                    eventObjects.splice(i, 1);
                }
            }
        }
    }

    /**取消所有注册 */
    public static offAll(): void {
        this.eventListeners.clear();
    }
}