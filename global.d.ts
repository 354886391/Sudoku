interface Logger {
    /** debug日志 */
    d(...data: any[]): void;
    /** 警告输出 */
    w(...data: any[]): void;
    /** 错误日志 */
    e(...data: any[]): void;
    /**
    * @param object dump的对象
    * @param label 标签
    */
    dump(object: Object, label?: string): void;
}

interface ILogger {
    level: number;

    log(...data: any[]): void;
    info(...data: any[]): void;
    warn(...data: any[]): void;
    error(...data: any[]): void;
}

declare var Log: Logger;
declare var LogEX: ILogger;
declare type Entry = import("./assets/script/framework/entry/Entry").Entry;
declare interface BaseEntry<T extends Entry> extends BundleClass<T> { }
declare interface BundleClass<T> { new(): T; bundle: string; }

declare module "cc" {
    interface Node {
        /** 借助它实现2.x层级效果，直接赋值不会有任何效果 */
        zIndex: number;
        /** 自定义需要挂在节点的数据 */
        userdata: any;
    }
    interface EditBox {
        /** 重写blur方法，避免调用了之后iOS闪退 */
        blur(): void;
    }
}