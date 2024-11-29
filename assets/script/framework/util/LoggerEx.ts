interface Config {
    sign: string;
    style: string;
    showTime: boolean;
}

type LEV = "log" | "info" | "warn" | "error";

class LogImpl implements ILogger {

    /** 日志等级 */
    level: number = 1;

    lev: LEV = "log";

    /** 日志配置 */
    config: { [key: string]: Config } = {
        log: { sign: "日志", style: "color: white; background-color: #8B8989;", showTime: true },
        info: { sign: "调试", style: "color: white; background-color: #007BFF;", showTime: true },
        warn: { sign: "警告", style: "color: white; background-color: #FFC107;", showTime: true },
        error: { sign: "错误", style: "color: white; background-color: #DC3545;", showTime: true },
    };

    public get log() {
        if (this.level <= 1) {
            return this.logFunc("log");
        } else {
            return () => { };
        }
    }

    public get info() {
        if (this.level <= 2) {
            return this.logFunc("info");
        } else {
            return () => { };
        }
    }

    public get warn() {
        if (this.level <= 3) {
            return this.logFunc("warn");
        } else {
            return () => { };
        }
    }

    public get error() {
        if (this.level <= 4) {
            return this.logFunc("error");
        } else {
            return () => { };
        }
    }

    public get date() {
        return new Date().toLocaleString();
    }

    private logFunc(lev: LEV) {
        const config = this.config[lev];
        return window.console[lev].bind(window.console, `%c[${config.sign}] ${this.date}`, config.style);
    }
}
window.LogEX = new LogImpl();