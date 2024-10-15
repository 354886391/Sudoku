/** 日志封装 */
import { Singleton } from "./Singleton";
window.Log = console as any;
window.Log.Color = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
};
window.Log.e = (...data: any[]) => {
    console.error(`${getDate()}: `, ...data);
    // addDebugMessage(data);
};
window.Log.d = (...data: any[]) => {
    console.log(`${getDate()}: `, ...data);
    // addDebugMessage(...data);
};
window.Log.w = (...data: any[]) => {
    console.warn(`${getDate()}: `, ...data);
    // addDebugMessage(data);
};
window.Log.dObject = (color: string, title: string, data: any) => {
    let arr: any[] = [`${color}${title}-->\n`];
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            arr.push(`\x1b[0m${key}: ${color}${data[key]} `);
        }
    }
    console.log(`${getDate()}: %s `, arr.join(""));
    // addDebugMessage(...data);
};
window.Log.dColor = (color: string, data: any) => {
    console.log(`${getDate()}: %s ${data}`, color);
    // addDebugMessage(...data);
};
window.Log.dTable = (data?: any, columns?: string[]) => {
    console.table(data, columns);
    // addDebugMessage(...data);
};
window.Log.dump = () => { };

function getDate() {
    return new Date().toLocaleString();
}

export class LoggerImpl extends Singleton<LoggerImpl>() {
    private logger: Logger = console as any;
    private _isDebug: boolean = false;

    public init(debug: boolean) {
        this._isDebug = debug;
        if (this._isDebug) {
            this.logger.d = Log.d;
            this.logger.dump = this.dump.bind(this);
        } else {
            this.logger.d = () => { };
            this.logger.dump = () => { };
        }
        this.logger.e = Log.e;
        this.logger.w = Log.w;
    }

    private dump() {
        let ret = this._dump(arguments[0], arguments[1], arguments[2], arguments[4]);
        this.logger.d(ret);
    }

    private _dump(
        data: any,
        name: string = 'unkown',
        level: number = 3,
        deep: number = 0
    ): string {
        if (level < 0) {
            return '...';
        }
        deep = deep + 3;
        let self = this;
        let do_boolean = function (v: boolean) {
            return 'Boolean(1) ' + (v ? 'TRUE' : 'FALSE');
        };
        let do_number = function (v: number) {
            return v;
        };
        let do_string = function (v: string) {
            return '"' + v + '"';
        };
        let do_object = function (v: any) {
            if (v === null) {
                return 'NULL(0)';
            }
            let out = '';
            let num_elem = 0;
            let indent = '';

            if (v instanceof Array) {
                num_elem = v.length;
                for (let d = 0; d < deep; ++d) {
                    indent += ' ';
                }
                out = 'Array(' + num_elem + ') ' + (indent.length === 0 ? '' : '') + '[';
                for (let i = 0; i < num_elem; ++i) {
                    out +=
                        '\n' +
                        (indent.length === 0 ? '' : '' + indent) +
                        '   [' +
                        i +
                        '] = ' +
                        self._dump(v[i], '', level - 1, deep);
                }
                out += '\n' + (indent.length === 0 ? '' : '' + indent + '') + ']';
                return out;
            } else if (v instanceof Object) {
                for (let d = 0; d < deep; ++d) {
                    indent += ' ';
                }
                out = '{';
                for (let p in v) {
                    out +=
                        '\n' +
                        (indent.length === 0 ? '' : '' + indent) +
                        '   [' +
                        p +
                        '] = ' +
                        self._dump(v[p], '', level - 1, deep);
                }
                out += '\n' + (indent.length === 0 ? '' : '' + indent + '') + '}';
                return out;
            } else {
                return 'Unknown Object Type!';
            }
        };
        name = typeof name === 'undefined' ? '' : name;
        let out = '';
        let v_name = '';
        switch (typeof data) {
            case 'boolean':
                v_name = name.length > 0 ? name + ' = ' : '';
                out += v_name + do_boolean(data);
                break;
            case 'number':
                v_name = name.length > 0 ? name + ' = ' : '';
                out += v_name + do_number(data);
                break;
            case 'string':
                v_name = name.length > 0 ? name + ' = ' : '';
                out += v_name + do_string(data);
                break;
            case 'object':
                v_name = name.length > 0 ? name + ' => ' : '';
                out += v_name + do_object(data);
                break;
            case 'function':
                v_name = name.length > 0 ? name + ' = ' : '';
                out += v_name + 'Function';
                break;
            case 'undefined':
                v_name = name.length > 0 ? name + ' = ' : '';
                out += v_name + 'Undefined';
                break;
            default:
                out += v_name + ' is unknown type!';
        }
        return out;
    }
}
