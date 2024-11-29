/** 日志封装 */
import { Singleton } from "./Singleton";
window.Log = console as any;

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
