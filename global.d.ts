interface Logger {
    Color: {
        Reset: string,
        Bright: string,
        Dim: string,
        Underscore: string,
        Blink: string,
        Reverse: string,
        Hidden: string,

        FgBlack: string,
        FgRed: string,
        FgGreen: string,
        FgYellow: string,
        FgBlue: string,
        FgMagenta: string,
        FgCyan: string,
        FgWhite: string,

        BgBlack: string,
        BgRed: string,
        BgGreen: string,
        BgYellow: string,
        BgBlue: string,
        BgMagenta: string,
        BgCyan: string,
        BgWhite: string,
    };
    /** 错误日志 */
    e(...data: any[]): void;
    /** debug日志 */
    d(...data: any[]): void;
    /** 警告输出 */
    w(...data: any[]): void;

    dObject(color: string, title: string, data: any): void;
    /**
     * @param color 打印颜色
     * @param data 打印内容
     */
    dColor(color: string, data: any): void;
    /**
     * @param data Array 或 Object	必需，填充到表格中的数据。
     * @param columns Array 可选，一个数组，表格标题栏的名称。
     */
    dTable(data?: any, columns?: string[]): void;
    /**
    * @param object dump的对象
    * @param label 标签
    */
    dump(object: Object, label?: string): void;
}

declare var Log: Logger;
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