export class Global {

    public static isLazyRelease = false;

    public static CDN: string = "";
    public static SUB_BUNDLE: string = "bundles";
    public static MAIN_BUNDLE: string = "resources";

    public static GAME_NAME = 'Gamer';
    public static GAME_NAME_CH = "大玩家";//游戏中文名称
    public static GAME_VERSION = '0.0.1';
    public static GAME_TIME = 60;      //游戏时间
    public static GAME_FRAME = 60;      //游戏当前帧率

    public static LOGIN_TIME = 0;

    public static MAX_PLAYER = 2;       //玩家最多人数
    public static MATCH_PARAMS = {};    //匹配参数 
    public static GAME_INIT_FRAME = 60; //游戏开发基础帧率

    public static DISMISS = 'dismiss';
    public static START_GAME = 'startGame';
    public static START_GAME_TIME = 'start_game_time';

    public static ownRound: boolean;
    public static ownId: string;
    public static ownSteps: number;
    public static ownDices: number[];

    public static CLIENT_ID: string = '1247079560185433024'; // 需要手动修改
    public static CLIENT_SECRET: string = 'C7731F7C3530A0B355550A8339841584B4172B75F536BADEFA7ED7C3F72BF67E'; // 需要手动修改
    public static APP_ID: string = '172249065902717087'; // 需要手动修改

    static log = window.console.log.bind(window.console, '%c【调试】', 'color: white; background-color: #007BFF; font-weight: bold; font-size: 14px;');

}