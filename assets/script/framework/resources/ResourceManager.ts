import { __private, AnimationClip, Asset, AssetManager, AudioClip, Constructor, Font, ImageAsset, JsonAsset, Mesh, ParticleAsset, Prefab, sp, SpriteAtlas, SpriteFrame, TextAsset, Texture2D } from "cc";
import { CacheManager, CacheData, CacheInfo } from "./CacheManager";
import { BundleManager } from "./BundleManager";
import { Singleton } from "../util/Singleton";


export interface RESOption {
    bundle: string;
    path: string;
    type: Constructor<any>;
}

export class ResourceManager extends Singleton<ResourceManager>() {
    private logTag = `[AssetManager]: `;
    private cacheMgr: CacheManager = new CacheManager();

    private getBundle(bundle: string | AssetManager.Bundle): AssetManager.Bundle {
        return BundleManager.instance.getBundle(bundle);
    }

    /** 从缓存中加载数据 
     * @param name bundle名
     * @param path 资源路径
     * @param type 资源类型
    */
    public get<T extends Asset>(name: string, path: string, type?: Constructor<T>): T {
        let cache = this.cacheMgr.get(name, path);
        if (cache && cache.loaded) {
            return cache.get<T>(type);
        }
        let bundle = this.getBundle(name);
        if (!bundle) {
            console.error(`${this.logTag} ${name} 没有加载，请先加载`);   //如果bundle不存在
            return null;
        }
        return bundle.get<T>(path, type);
    }

    public getBy<T extends Asset>(option: RESOption): T {
        let cache = this.cacheMgr.get(option.bundle, option.path);
        if (cache && cache.loaded) {
            return cache.get<T>(option.type);
        }
        let bundle = this.getBundle(option.bundle);
        if (!bundle) {
            console.error(`${this.logTag} ${option.bundle} 没有加载，请先加载`);   //如果bundle不存在
            return null;
        }
        return bundle.get<T>(option.path, option.type);
    }

    /**
     * @param name bundle名
     * @param path 资源路径
     * @param type 资源类型
     * @param onProgress 加载进度
     * @param onComplete 加载完成
     */
    public load<T extends Asset>(
        name: string,
        path: string,
        type: Constructor<T>,
        onProgress: (finish: number, total: number, item: AssetManager.RequestItem) => void,
        onComplete: (data: T) => void): void {
        // console.time(`load--> ${path}.`);
        let cache = this.cacheMgr.get(name, path);
        if (cache) {
            this.onLoadComplete(cache, onComplete, null, cache.get<T>(type));
            return;
        }
        let bundle = BundleManager.instance.getBundle(name);
        if (!bundle) {
            let err = new Error(`${this.logTag} ${name} 没有加载，请先加载`);
            this.onLoadComplete(null, onComplete, err, null);
            return;
        }
        // 没有缓存时
        cache = new CacheInfo(name, path, type);
        if (onProgress) {
            bundle.load(path, type, onProgress, this.onLoadComplete.bind(this, cache, onComplete));
        } else {
            bundle.load(path, type, this.onLoadComplete.bind(this, cache, onComplete));
        }
    }

    private onLoadComplete<T extends Asset>(cache: CacheInfo, onComplete: (data: T) => void, err: Error, data: T): void {
        if (err) {
            console.warn(`${this.logTag}加载资源失败:${cache.path} 原因:${err.message ? err.message : "未知"}`);
            this.cacheMgr.remove(cache.bundle, cache.path);
            onComplete(data);
        }
        // console.timeEnd(`load--> ${info.path}.`);
        cache.loaded = true;
        cache.data = new CacheData(cache.path, data, cache.type);
        this.cacheMgr.set(cache);
        onComplete(data);
    }

    public loadBy(
        options: { [key: string]: RESOption },
        onProgress: (finish: number, total: number) => void,
        onComplete: (err: Error | null) => void): void {
        console.time("loadBy");
        let keys: string[] = [];
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        let finish = 0;
        let total = keys.length;
        let onceCompleted = (data: Asset) => {
            if (data && finish < total) {
                finish++;
                onProgress?.call(this, finish, total);
            }
            let key = keys.shift();
            if (key == undefined) {
                console.timeLog("loadBy", options);
                onComplete(null);
                return;
            }
            let opt = options[key];
            this.load(opt.bundle, opt.path, opt.type, null, onceCompleted);
        }
        // 开始加载资源
        onceCompleted(null);
    }

    public loadDir(
        name: string,
        path: string,
        type: Constructor<Asset>,
        onProgress: (finish: number, total: number, item: AssetManager.RequestItem) => void,
        onComplete: (err: Error) => void): void {

        let cache = this.cacheMgr.get(name, path);
        if (cache) {
            if (cache.loaded) {
                onComplete(null);
            }
        } else {
            cache = new CacheInfo(name, path, type);    // 创建缓存
            let bundle = BundleManager.instance.getBundle(name);
            if (!bundle) {
                let err = new Error(`${this.logTag} ${path} 没有加载，请先加载`);
                console.warn(err);
                onComplete(err);
                return;
            }
            if (onProgress) {
                bundle.loadDir(path, type, onProgress, this.onDirComplete.bind(this, cache, onComplete));
            } else {
                bundle.loadDir(path, type, this.onDirComplete.bind(this, cache, onComplete));
            }
        }
    }

    onDirComplete(cache: CacheInfo, onComplete: (err: Error) => void, err: Error | null, data: Asset[]) {
        cache.loaded = true;
        if (err) {
            console.warn(`${this.logTag}加载资源失败:${cache.path} 原因:${err.message ? err.message : "未知"}`);
            cache.data = (null);
            this.cacheMgr.remove(cache.bundle, cache.path);
            onComplete(err);
        } else {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                let type = this.getType(item);
                cache.data = new CacheData(cache.path, item, type);
                this.cacheMgr.set(cache);
            }
            onComplete(null);
        }
    }

    public releaseAsset(data: CacheInfo) {
        let bundle = BundleManager.instance.getBundle(data.bundle);
        if (!bundle) {
            let err = new Error(`${this.logTag} ${name} 没有加载，请先加载`);
            console.warn(err);
            return;
        }
        bundle.release(data.path);
    }

    public retainAsset(info: CacheInfo) {

    }

    /**
     * @description 添加常驻资源
     * @param prefab
     */
    public addPersistAsset(data: CacheInfo) {
        data.retain = true;
    }

    public getType<T extends Asset>(item: T) {
        switch (true) {
            case item instanceof Prefab:
                return Prefab;
            case item instanceof Texture2D:
                return Texture2D;
            case item instanceof SpriteFrame:
                return SpriteFrame;
            case item instanceof SpriteAtlas:
                return SpriteAtlas;
            case item instanceof sp.SkeletonData:
                return sp.SkeletonData;
            case item instanceof ParticleAsset:
                return ParticleAsset;
            case item instanceof ImageAsset:
                return ImageAsset;
            case item instanceof JsonAsset:
                return JsonAsset;
            case item instanceof TextAsset:
                return TextAsset;
            case item instanceof AnimationClip:
                return AnimationClip;
            case item instanceof AudioClip:
                return AudioClip;
            case item instanceof Mesh:
                return Mesh;
            case item instanceof Font:
                return Font;
            default:
                return Asset;
            // AnimationClip
        }
    }
}