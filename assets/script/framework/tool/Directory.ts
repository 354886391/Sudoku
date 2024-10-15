/**
 * 该方法是对 `Object.create(null)` 的简单封装。
 * `Object.create(null)` 用于创建无 prototype （也就无继承）的空对象。
 * 这样我们在该对象上查找属性时，就不用进行 `hasOwnProperty` 判断，此时对性能提升有帮助。
 *
 * @param forceDictMode 对新创建的Map对象应用删除操作。这将让V8将对象置于 "字典模式"，并禁止创建隐藏类。这将提高那些不断变化形状对象的性能。
 * @returns 一个新的 map 对象。
 */
function createDictionary(forceDictMode?: boolean): any {
    const map = Object.create(null);
    if (forceDictMode) {
        const INVALID_IDENTIFIER_1 = '.';
        const INVALID_IDENTIFIER_2 = '/';
        // assign dummy values on the object
        map[INVALID_IDENTIFIER_1] = 1;
        map[INVALID_IDENTIFIER_2] = 1;
        delete map[INVALID_IDENTIFIER_1];
        delete map[INVALID_IDENTIFIER_2];
    }
    return map;
}

export interface IDictionary<T> {

    set(key: string | number, val: T): T;

    get(key: string | number): T | undefined | null;

    has(key: string | number): boolean;

    remove(key: string | number): T | undefined | null;

    clear(): void;

    forEach(func: (val: T, key: string | number) => void): void;

    find(predicate: (val: T, key: string | number) => boolean): T | null;

    readonly count: number;

    destroy(): void;
}

export default class Dictionary<T = any> implements IDictionary<T> {

    public get dict(): Record<string | number, T> | null {
        return this._dict;
    }
    protected _dict: Record<string | number, T> | null = null;
    protected _count = 0;

    constructor(dict?: Record<string | number, T>) {
        if (dict) {
            this._dict = dict;
            this._count = Object.keys(dict).length;
        } else {
            this._dict = createDictionary(true);
            this._count = 0;
        }
    }

    public set(key: string | number, val: T): T {
        if (!(key in this._dict!)) {
            this._count++;
        }
        return this._dict![key] = val;
    }

    public get(key: string | number): T | undefined | null {
        return this._dict![key];
    }

    public has(key: string | number): boolean {
        return key in this._dict!;
    }

    public remove(key: string | number): T | undefined | null {
        const out = this._dict![key];
        if (key in this._dict!) {
            delete this._dict![key];
            this._count--;
        }
        return out;
    }

    public clear(): void {
        if (this._count !== 0) {
            this._dict = createDictionary(true);
            this._count = 0;
        }
    }

    public forEach(func: (val: T, key: string | number) => void): void {
        for (const key in this._dict) {
            func(this._dict[key], key);
        }
    }

    public find(predicate: (val: T, key: string | number) => boolean): T | null {
        for (const key in this._dict) {
            if (predicate(this._dict[key], key)) {
                return this._dict[key];
            }
        }
        return null;
    }

    get count(): number {
        return this._count;
    }

    public destroy(): void {
        this._dict = null;
    }
}
