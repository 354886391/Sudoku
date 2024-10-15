import { AssetManager, resources, sys } from "cc";
import { Global } from "../../Global";
import { Singleton } from "../util/Singleton";

/**
 * 在通过 API 加载 AssetBundle 时，引擎并没有加载 AssetBundle 中的所有资源，而是
 * 加载 AssetBundle 的资源清单，以及包含的所有脚本。
 * 当 AssetBundle 加载完成后，会触发回调并返回错误信息和 AssetManager.Bundle 类的实例，
 * 这个实例就是 AssetBundle APl 的主要入口，开发者可以使用它去加载AssetBundle 中的各类资源。
 */
export class BundleManager extends Singleton<BundleManager>() {

    public isLoading = false;

    public getBundle(bundle: string | AssetManager.Bundle): AssetManager.Bundle {
        if (bundle) {
            if (typeof bundle == "string") {
                return AssetManager.instance.getBundle(bundle);
            }
            return bundle;
        }
        return resources;
    }

    public loadBundle(name: string, callback: Function) {
        let bundle = this.getBundle(name);
        if (bundle) {
            Log.d(`${name}已经加载在缓存中，直接使用`);
            this.isLoading = false;
            return;
        }
        Log.d(`loadBundle : ${name}`);
        this.isLoading = true;
        let bundleFunc = (err: Error | null, data: AssetManager.Bundle) => {
            this.isLoading = false;
            if (err) {
                Log.e(`load bundle : ${name}, fail !!! ${err}`);
            } else {
                Log.d(`load bundle : ${name}, success !!!`);
                callback && callback();
            }
        };
        if (sys.isBrowser) {
            name = `${Global.CDN}/${Global.GAME_NAME}/assets/${name}`;
            AssetManager.instance.loadBundle(name, bundleFunc);
        } else {
            AssetManager.instance.loadBundle(name, bundleFunc);
        }
    }
}