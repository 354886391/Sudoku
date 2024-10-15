import { Asset, AssetManager, Constructor, resources } from "cc";

export class Resource<T extends Asset> {
    public isLoaded: boolean;       // 是否已经加载完成
    public path: string;            // 加载完成数据
    public bundle: string;
    public type: Constructor<T>;
    public data: T;

    constructor(path: string, type?: Constructor<T>) {
        this.type = type;
        this.data = null;
    }
}

export class ResourceManager2 {
    
    private static _configs: { [key: string]: any };

    static onProgress: (finished: number, total: number, item: AssetManager.RequestItem) => void;

    static onComplete: () => void;

    public static init(config: { [key: string]: any }): void {
        this._configs = config;
    }

    public static get<T extends Asset>(res: string | Resource<T>, type?: Constructor<T>) {
        if (res instanceof Resource) {
            if (res.data == null) {
                res.data = resources.get(res.path, res.type);
            }
            return res.data;
        }
        return resources.get<T>(res, type);
    }

    public static load<T extends Asset>(path: string, onComplete: (assets) => void): void {
        resources.load(path, (err: Error, assets: T) => {
            // 检查加载资源错误
            if (err) {
                Log.w(`loadRes fail, path: ${path} error: ${err}`);
                onComplete(null);
                return;
            }
            if (assets) {
                onComplete(assets);
            } else {
                Log.w(`loadRes fail, path: ${path}`);
                onComplete(null);
                return;
            }
        });
    }

    /** 加载资源 */
    public static loadResources<T extends Asset>(callback: Function, thisArg: any) {
        let keys: string[] = [];
        for (const key in this._configs) {
            keys.push(key);
        }
        let load = () => {
            let key = keys.shift();
            if (!key) {
                Log.w("load assets complete");
                if (callback && thisArg) {
                    callback.call(thisArg);
                }
                return;
            }
            let asset: Resource<T> = this._configs[key];
            Log.d(`loading source: ${key}`);
            resources.load(asset.path, asset.type, (finished, total, item) => { }, load);
        }
        load.call(this);
    }

    public static destroy() {
        for (let key in this._configs) {
            let config = this._configs[key];
            config.assets = null;
        }
    }
}


