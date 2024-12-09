import { Global } from "../../../script/Global";
import { Sudoku } from "../tool/Sudoku";
import { Channel, Player } from "./GameDefine";

export class GameState {

    public static players: Player[];        // 玩家信息
    public static isGaming: boolean;
    // board
    private static _sudoku: Sudoku;
    private static _board: string;
    private static _solveBoard: string;
    private static _candidatesBoard: string[][];
    // frame
    public static frameId: number;          // 逻辑帧标示符
    public static frameTime: number;        // 当前帧的时间
    public static startTime: number;        // 游戏开始时间
    public static remainTime: number;       // 剩余时间

    static get board() {
        return this._board;
    }

    static set board(board: string) {
        this._board = board;
    }

    static get gridBoard() {
        if (this._board) {
            return this.convertGridBoard(this._board);
        }
    }

    static get gridSolveBoard() {
        if (this._solveBoard) {
            return this.convertGridBoard(this._solveBoard);
        }
    }

    /** 设置初始信息 */
    public static init() {
        let initPlayers = () => {
            let players: Player[] = [];
            for (let i: number = 0; i < Global.MAX_PLAYER; i++) {
                let player: Player = {
                    id: i,
                    score: 0,
                    isLead: false,
                    channel: {} as Channel,
                };
                players.push(player);
            }
            return players;
        }
        GameState.isGaming = false;
        GameState.frameId = 0;
        GameState.players = initPlayers();
        GameState.frameTime = Date.now();
    }

    /** 生成牌面 */
    static createBoard(difficulty: string | number = "easy") {
        if (!this._sudoku) {
            this._sudoku = new Sudoku();
        }
        return this._sudoku.generate(difficulty);
    }

    /** 处理牌面 */
    static handleBoard(board?: string) {
        if (!this._sudoku) {
            this._sudoku = new Sudoku();
        }
        if (!board || board == "") {
            board = this._sudoku.generate("easy");
        }
        this._board = board;
        this._solveBoard = this._sudoku.solve(this._board);
        this._candidatesBoard = this._sudoku.get_candidates(this._board);
    }

    static convertGridBoard(board: string): string[][] {
        let rows: string[][] = [];
        let cur_row: string[] = [];
        for (let i = 0; i < board.length; i++) {
            cur_row.push(board[i]);
            if (i % 9 == 8) {
                rows.push(cur_row);
                cur_row = [];
            }
        }
        return rows;
    }
}