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
    SelectPanel: {
        name: "SelectPanel",
        path: "prefab/panel/SelectPanel",
        bundle: "bundles",
        hasMask: false,
        isCache: false,
        isPreload: true,
        layerIndex: UILayer.popup,
    },
    ReadyGoPanel: {
        name: "ReadyGoPanel",
        path: "prefab/panel/ReadyGoPanel",
        bundle: "bundles",
        hasMask: false,
        isCache: false,
        isPreload: true,
        layerIndex: UILayer.popup,
    },
    ReadyPanel: {
        name: "ReadyPanel",
        path: "prefab/panel/ReadyPanel",
        bundle: "bundles",
        hasMask: false,
        isCache: false,
        isPreload: true,
        layerIndex: UILayer.popup,
    },
    RewardPanel: {
        name: "RewardPanel",
        path: "prefab/panel/RewardPanel",
        bundle: "bundles",
        hasMask: false,
        isCache: false,
        isPreload: true,
        layerIndex: UILayer.popup,
    },
    HintDialog: {
        name: "HintDialog",
        path: "prefab/panel/dialog/HintDialog",
        bundle: "bundles",
        hasMask: false,
        isCache: false,
        isPreload: true,
        layerIndex: UILayer.notice,
    },
    HintNotice: {
        name: "HintNotice",
        path: "prefab/panel/notice/HintNotice",
        bundle: "bundles",
        hasMask: false,
        isCache: false,
        isPreload: true,
        layerIndex: UILayer.notice,
    },
    LoadNotice: {
        name: "LoadNotice",
        path: "prefab/panel/notice/LoadNotice",
        bundle: "bundles",
        hasMask: false,
        isCache: false,
        isPreload: true,
        layerIndex: UILayer.notice,
    },
}

/** 资源配表 */
export const RES_GAME: { [key: string]: RESOption } = {
    // 配置
    // map: { bundle: Global.SUB_BUNDLE, path: "resources/config/map", type: JsonAsset },
    // tile: { bundle: Global.SUB_BUNDLE, path: "resources/prefab/tiles/tile", type: Prefab },

    names: { bundle: Global.SUB_BUNDLE, path: "data/names", type: JsonAsset },
}


