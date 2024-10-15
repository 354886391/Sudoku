import { Asset, Constructor, isValid } from "cc";

/** 缓存数据 */
export class CacheData {
    public path?: string = "";
    public asset: Asset = null;   // 加载完成数据
    public type?: Constructor<Asset> = null;

    constructor(path: string, asset: Asset, type?: Constructor<Asset>) {
        this.path = path;
        this.asset = asset;
        this.type = type;
    }
}

/*
 * 缓存信息 
 * 同一路径下存在多个不同类型的资源文件
*/
export class CacheInfo {
    public loaded: boolean = false;        // 是否已经加载完成
    public retain: boolean = false;
    public bundle: string = "";
    public path: string = "";
    public type: Constructor<Asset> = null;
    private _data: CacheData | CacheData[] = null;

    /**
     * 
     * @param bundle bundle名
     * @param path 资源路径
     * @param type 资源类型
     * @param data 缓存数据
     */
    constructor(bundle: string, path: string, type: Constructor<Asset>, data?: CacheData) {
        this.bundle = bundle;
        this.path = path;
        this.type = type;
        this._data = data;
    }

    public set data(value: CacheData) {
        if (this._data == null) {
            this._data = value;
        } else if (this._data instanceof Array) {
            this._data.push(value);
        } else {
            this._data = new Array(this._data, value);
        }
    }

    public get<T extends Asset>(type?: Constructor<T>): T {
        if (this._data instanceof Array) {
            if (type) {
                return this._data.find(value => value.type == type).asset as T;
            } else {
                return this._data[0].asset as T;
            }
        } else {
            return this._data.asset as T;
        }
    }

    /** 无效资源 */
    public get isInvalid() {
        return this.loaded && this._data && !isValid(this._data);
    }
}

/** bundle 中的资源缓存 */
export class ResourceCache {
    /**  bundle名 */
    private _name = "UNKNOWN";

    private _caches = new Map<string, CacheInfo>();

    constructor(name: string) {
        this._name = name;
    }

    public get(path: string, isCheck: boolean): CacheInfo {
        if (this._caches.has(path)) {
            let cache = this._caches.get(path);
            if (isCheck && cache && cache.isInvalid) {
                Log.e(`资源加载完成，但已经被释放 , 请重新加载资源 : ${this._name} ${path}`);
                this.remove(path);
                return null;
            }
            return cache;
        }
        return null;
    }

    public set(data: CacheInfo): void {
        this._caches.set(data.path, data);
    }

    public remove(path: string): boolean {
        return this._caches.delete(path);
    }

    public get size(): number {
        return this._caches.size;
    }
}

export class CacheManager {
    private logTag = `[CacheMgr]: `;

    /** 缓存不同 bundle 的资源 */
    private _bundles = new Map<string, ResourceCache>();

    public get(name: string, path: string, isCheck: boolean = true): CacheInfo {
        if (this._bundles.has(name)) {
            return this._bundles.get(name).get(path, isCheck);
        }
        return null;
    }

    public set(data: CacheInfo) {
        if (!this._bundles.has(data.bundle)) {
            let cache = new ResourceCache(data.bundle);
            cache.set(data);
            this._bundles.set(data.bundle, cache);
        } else {
            this._bundles.get(data.bundle).set(data);
        }
    }

    public remove(name: string, path: string) {
        if (this._bundles.has(name)) {
            return this._bundles.get(name).remove(path);
        }
        return false;
    }

    public removeBundle(name: string) {
        if (this._bundles.has(name)) {
            Log.d(`${this.logTag}移除bundle cache : ${name}`);
            this._bundles.delete(name);
        }
    }
}
