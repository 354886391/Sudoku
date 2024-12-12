export class Global {

    public static isLazyRelease = false;

    public static CDN: string = "";
    public static SUB_BUNDLE: string = "bundles";
    public static MAIN_BUNDLE: string = "resources";

    public static GAME_NAME = 'Sudoku';
    public static GAME_NAME_CH = "数独";//游戏中文名称
    public static GAME_VERSION = '0.0.1';
    public static GAME_TIME = 120;      //游戏时间
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

    public static GAME_ID: number = 1;
    public static CLIENT_ID: string = '1571149523537916544'; // 需要手动修改
    public static CLIENT_SECRET: string = '1D058E6347CF2804A0D3B59B50F9AA8A570ACAF143166C70808D385319D11A88'; // 需要手动修改
    public static APP_ID: string = '245150415728055539'; // 需要手动修改
}