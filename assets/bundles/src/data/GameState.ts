import { GobeManager } from "../../../script/network/GobeManager";
import { Sudoku } from "../tool/Sudoku";
import { Player } from "./GameDefine";

export class GameState {
    public static isGaming: boolean;
    public static players: Player[];        // 玩家信息

    public static frameId: number;          // 逻辑帧标示符
    public static frameTime: number;        // 当前帧的时间
    public static remainTime: number;       // 剩余时间

    private static _sudoku: Sudoku;

    private static _board: string;           // 牌面
    private static _solveBoard: string;
    private static _candidatesBoard: string[][];

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

    static getBoard(difficulty: string | number) {
        if(this._sudoku == null){
            this._sudoku = new Sudoku();
        }
        return this._sudoku.generate(difficulty);
    }

    static initBoard(board?: string) {
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