import { UILayer, UIOption } from "../ui/UIManager";
import { RESOption as RESOption } from "../resources/ResourceManager";

/** UI配置 */
export const UI_ROOT: { [key: string]: UIOption } = {
    // 选择玩家游戏角色
    StartPanel: {
        name: "StartPanel",
        path: "prefab/StartPanel",
        bundle: "resources",
        hasMask: false,
        isCache: false,
        isPreload: false,
        layerIndex: UILayer.default,
    },
}

export const RES_ROOT: { [key: string]: RESOption } = {
    
}