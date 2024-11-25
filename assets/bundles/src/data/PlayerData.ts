import { Singleton } from "../../../script/framework/util/Singleton";
import { StorageManager } from '../../../script/framework/storage/StorageManager';
import { LOCAL_CACHE } from "./GameConst";


interface PlayerInfo {
    pid?: string;
    name?: string;
    avatar?: string;
    staticId?: number;
}

interface HistoryInfo {
    pid?: string;
}

interface SettingInfo {
    pid?: string;
}

export class PlayerData extends Singleton<PlayerData>() {

    localTime: number = 0;
    serverTime: number = 0;

    isInit: boolean = false;
    isNewbie: boolean = false;

    userId: string = "";
    dataVersion: string = "";

    playerInfo: PlayerInfo = null;
    historyInfo: HistoryInfo = null;
    settingInfo: SettingInfo = null;

    /**
    * 生成随机账户
    * @returns
    */
    public generateAccount() {
        this.userId = new Date().getTime() + "_" + Math.floor(Math.random() * 1000);
        StorageManager.instance.setUserId(this.userId);
    }

    /**
     * 存用户数据
     * @param userId 
     */
    public saveAccount(userId: any) {
        this.userId = userId;
        StorageManager.instance.setUserId(userId);
    }

    /**
     * 创建角色数据
     * @param loginData 
     */
    public createPlayer(loginData?: PlayerInfo) {
        this.playerInfo = {};
        if (loginData) {
            // for (let key in loginData) {
            //     this.playerInfo[key] = loginData[key];
            // }
            this.playerInfo = {
                pid: loginData.pid,
                name: loginData.name,
                avatar: loginData.avatar,
                staticId: loginData.staticId
            }
        }
        this.savePlayerInfoToLocalCache();
    }

    /**
     * 更新用户信息
     * 例如钻石、金币、道具
     * @param {String} key
     * @param {Number} value
     */
    public updatePlayer(key: string, value: any) {
        this.playerInfo[key] = value;
        StorageManager.instance.setConfigData(LOCAL_CACHE.PLAYER, JSON.stringify(this.playerInfo));
    }

    /**
     * 获取玩家杂项值
     * @param {string} key 
     */
    public getSetting(key: string) {
        if (!this.settingInfo) {
            return null;
        }
        if (!this.settingInfo.hasOwnProperty(key)) {
            return null;
        }
        return this.settingInfo[key];
    }

    /**
     * 设置玩家杂项值
     * @param {string} key 
     * @param {*} value 
     */
    public setSetting(key: string, value: any) {
        if (!this.settingInfo) {
            this.settingInfo = {};
        }
        this.settingInfo[key] = value;
        this.saveSettingsToLocalCache();
    }

    /**
     * 当数据同步完毕，即被覆盖的情况下，需要将数据写入到本地缓存，以免数据丢失
     */
    public saveAll() {
        StorageManager.instance.setConfigDataWithoutSave(LOCAL_CACHE.PLAYER, JSON.stringify(this.playerInfo));
        StorageManager.instance.setConfigDataWithoutSave(LOCAL_CACHE.HISTORY, JSON.stringify(this.historyInfo));
        StorageManager.instance.setConfigDataWithoutSave(LOCAL_CACHE.SETTINGS, JSON.stringify(this.settingInfo));
        StorageManager.instance.setConfigData(LOCAL_CACHE.DATA_VERSION, this.dataVersion);
    }

    /**
     * 清除用户信息
     */
    public clear() {
        this.playerInfo = {};
        this.settingInfo = {};
        this.saveAll();
    }

    ///////////////本地缓存相关///////////////

    /**
    * 加上用户数据
    */
    public loadGlobalCache() {
        let userId: string = StorageManager.instance.getUserId();
        if (userId) {
            this.userId = userId;
        }
    }

    /**
    * 加载本地存储数据
    */
    public loadFromCache() {
        this.loadGlobalCache();
        if (!this.userId) {
            this.generateAccount();
        }
        //读取玩家基础数据
        this.playerInfo = this.loadDataByKey(LOCAL_CACHE.PLAYER);
        this.historyInfo = this.loadDataByKey(LOCAL_CACHE.HISTORY);
        this.settingInfo = this.loadDataByKey(LOCAL_CACHE.SETTINGS);
    }

    /**
     * 获取本地存储数据
     * @param {string}keyName 
     * @returns 
     */
    private loadDataByKey(keyName: any) {
        let ret = {};
        let str = StorageManager.instance.getConfigData(keyName);
        if (str) {
            try {
                ret = JSON.parse(str);
            } catch (e) {
                ret = {};
            }
        }
        return ret;
    }

    /**
     * 保存玩家数据
     */
    public savePlayerInfoToLocalCache() {
        StorageManager.instance.setConfigData(LOCAL_CACHE.PLAYER, JSON.stringify(this.playerInfo));
    }

    /**
     * 保存玩家设置相关信息
     */
    public saveSettingsToLocalCache() {
        StorageManager.instance.setConfigData(LOCAL_CACHE.SETTINGS, JSON.stringify(this.settingInfo));
        StorageManager.instance.save();
    }
}