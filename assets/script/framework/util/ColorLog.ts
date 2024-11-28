
export class ColorLog {
    static logStr: string = "日志"
    static traceStr: string = "跟踪"
    static warnStr: string = "警告"
    static errorStr: string = "错误"
    static timeStr: string = "计时"

    static LEVEL = {
        LOG: 0,
        DEBUG: 1,
        WARN: 2,
        ERROR: 3,
        INFO: 4

    };

    static level: number = ColorLog.LEVEL.LOG;

    public static get log() {
        return window.console.log.bind(window.console, `%c[${ColorLog.logStr}]', 'color: white; background-color: #007BFF; font-weight: bold; font-size: 14px;`);
    }

    public static get debug() {
        return window.console.debug.bind(window.console, `%c[${ColorLog.logStr}]', 'color: white; background-color: #007BFF; font-weight: bold;`);
    }

    public static get trace() {
        return window.console.trace.bind(window.console, `%c[${ColorLog.logStr}]', 'color: white; background-color: #007BFF; font-weight: bold;`);
    }

    public static get info() {
        return window.console.info.bind(window.console, `%c[${ColorLog.logStr}]', 'color: white; background-color: #007BFF; font-weight: bold;`);
    }

    public static get warn() {
        return window.console.warn.bind(window.console, `%c[${ColorLog.logStr}]', 'color: white; background-color: #007BFF; font-weight: bold;`);
    }

    public static get error() {
        return window.console.error.bind(window.console, `%c[${ColorLog.logStr}]', 'color: white; background-color: #007BFF; font-weight: bold; `);
    }
}

// let log = window.console.log.bind(window.console, `%c[调试]', 'color: white; background-color: #007BFF; font-weight: bold; font-size: 14px;`);
// https://segmentfault.com/a/1190000023804576