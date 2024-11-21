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

    public static MAX_PLAYER = 2;//玩家最多人数

    public static GAME_INIT_FRAME = 60; //游戏开发基础帧率

    public static DISMISS = 'dismiss';
    public static START_GAME = 'startGame';
    public static START_GAME_TIME = 'start_game_time';

    public static ownRound: boolean;
    public static ownId: string;
    public static ownSteps: number;
    public static ownDices: number[];
}