import { _decorator, JsonAsset, Prefab } from 'cc';
import { UIOption, UILayer } from '../../../script/framework/ui/UIManager';
import { RESOption } from '../../../script/framework/resources/ResourceManager';
import { Global } from '../../../script/Global';


/** UI配置 */
export const UI_GAME: { [key: string]: UIOption } = {
    // 主界面
    GamePanel: {
        name: "GamePanel",
        path: "prefab/panel/GamePanel",
        bundle: "bundles",
        hasMask: false,
        isCache: false,
        isPreload: true,
        layerIndex: UILayer.default,
    },
    StartPanel: {
        name: "StartPanel",
        path: "prefab/panel/StartPanel",
        bundle: "bundles",
        hasMask: false,
        isCache: false,
        isPreload: true,
        layerIndex: UILayer.default,
    },

}

/** 资源配表 */
export const RES_GAME: { [key: string]: RESOption } = {
    // 配置
    // map: { bundle: Global.SUB_BUNDLE, path: "resources/config/map", type: JsonAsset },
    // tile: { bundle: Global.SUB_BUNDLE, path: "resources/prefab/tiles/tile", type: Prefab },
}


