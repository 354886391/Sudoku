import { UILayer, UIOption } from "../framework/ui/UIManager";
import { RESOption as RESOption } from "../framework/resources/ResourceManager";

/** UI配置 */
export const UI_ROOT: { [key: string]: UIOption } = {
    // 选择玩家游戏角色
    MainPanel: {
        name: "MainPanel",
        path: "prefab/MainPanel",
        bundle: "resources",
        hasMask: false,
        isCache: false,
        isPreload: false,
        layerIndex: UILayer.default,
    },
}

export const RES_ROOT: { [key: string]: RESOption } = {
    
}