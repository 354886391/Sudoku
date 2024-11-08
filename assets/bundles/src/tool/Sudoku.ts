import { Singleton } from "../../../script/framework/util/Singleton";


const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const MIN_GIVENS = 17;
const NR_SQUARES = 81;
const BLANK_CHAR = ".";
const BLANK_BOARD = ".................................................................................";

const DIFFICULTY = {
    "easy": 62,
    "medium": 53,
    "hard": 44,
    "very-hard": 35,
    "insane": 26,
    "inhuman": 17,
}

export class Sudoku extends Singleton<Sudoku>() {

    UNITS = null;
    SQUARES = null;

    SQUARE_UNITS_MAP = null;
    SQUARE_PEERS_MAP = null;

    initialize() {

    }

    generate(difficulty, unique) {
        difficulty = this._force_range(difficulty, NR_SQUARES + 1, MIN_GIVENS);
        unique = unique || true;
        let blank_board = "";
        for (let i = 0; i < NR_SQUARES; i++) {
            blank_board += '.';
        }
        let candidates = this._get_candidates_map(blank_board);
        let shuffled_squares = this._shuffle(this.SQUARES);
    }

    solve() {

    }

    get_candidates() {

    }

    _get_candidates_map(board: string) {

    }

    _search() {

    }

    _assign() {

    }

    _eliminate() {

    }

    _get_square_vals_map() {

    }

    _get_square_units_map() {

    }

    _get_square_peers_map() {

    }

    _get_all_units(rows: string[], cols: string[]): string[][] {
        /* Return a list of all units (rows, cols, boxes) */
        let units: string[][] = [];

        // Rows
        for (let ri = 0; ri < rows.length; ri++) {
            units.push(this._cross(rows[ri], cols.join('')));
        }

        // Columns
        for (let ci = 0; ci < cols.length; ci++) {
            units.push(this._cross(rows.join(''), cols[ci]));
        }

        // Boxes
        const row_squares = ["ABC", "DEF", "GHI"];
        const col_squares = ["123", "456", "789"];
        for (let rsi = 0; rsi < row_squares.length; rsi++) {
            for (let csi = 0; csi < col_squares.length; csi++) {
                units.push(this._cross(row_squares[rsi], col_squares[csi]));
            }
        }

        return units;
    }

    board_string_to_grid(board_string: string): string[][] {
        /* Convert a board string to a two-dimensional array */
        let rows: string[][] = [];
        let cur_row: string[] = [];
        for (let i = 0; i < board_string.length; i++) {
            cur_row.push(board_string[i]);
            if (i % 9 === 8) {
                rows.push(cur_row);
                cur_row = [];
            }
        }
        return rows;
    }

    board_grid_to_string(board_grid: string[][]): string {
        /* Convert a board grid to a string */
        var board_string = "";
        for (var r = 0; r < 9; ++r) {
            for (var c = 0; c < 9; ++c) {
                board_string += board_grid[r][c];
            }
        }
        return board_string;
    }

    print_board(board: any[]) {
        /* Print a sudoku `board` to the console. */
        // Assure a valid board
        const report = this.validate_board(board);
        if (report !== true) {
            throw new Error(report);
        }
        const V_PADDING = " ";  // Insert after each square
        const H_PADDING = '\n'; // Insert after each row
        const V_BOX_PADDING = "  "; // Box vertical padding
        const H_BOX_PADDING = '\n'; // Box horizontal padding
        let display_string = "";
        for (let i = 0; i < board.length; i++) {
            const square = board[i];
            // Add the square and some padding
            display_string += square + V_PADDING;
            // Vertical edge of a box, insert v. box padding
            if (i % 3 === 2) {
                display_string += V_BOX_PADDING;
            }
            // End of a line, insert horizontal. padding
            if (i % 9 === 8) {
                display_string += H_PADDING;
            }
            // Horizontal edge of a box, insert h. box padding
            if (i % 27 === 26) {
                display_string += H_BOX_PADDING;
            }
        }
        console.log(display_string);
    }

    validate_board(board: any[]) {
        // Check for empty board
        if (!board) {
            return "Empty board";
        }
        // Invalid board length
        if (board.length !== NR_SQUARES) {
            return `Invalid board size. Board must be exactly ${NR_SQUARES} squares.`;
        }
        // Check for invalid characters
        for (let i = 0; i < board.length; i++) {
            const char = board[i];
            if (!this._in(char, DIGITS) && char !== BLANK_CHAR) {
                return `Invalid board character encountered at index ${i}: ${char}`;
            }
        }
        // Otherwise, we're good. Return true.
        return true;
    }

    _cross(a: string, b: string): string[] {
        const result: string[] = [];
        for (let ai of a) {
            for (let bi of b) {
                result.push(ai + bi);
            }
        }
        return result;
    }

    _in(v: any, seq: any[]): any {
        return seq.indexOf(v) !== -1;
    }

    _first_true(seq: any[]): any {
        return seq.find(value => value == true);
    }

    _shuffle(seq: any[]): any[] {
        for (let i = seq.length - 1; i > 0; i--) {
            // 生成一个从 0 到 i 的随机索引
            const j = this._rand_range(i + 1);
            // 交换当前元素和随机索引对应的元素
            [seq[i], seq[j]] = [seq[j], seq[i]];
        }
        return seq;
    }

    /**
     * 随机取一个数[min, max)
     * @param {*} max 
     * @param {*} min 
     * @returns 
     */
    _rand_range(max: number, min: number = 0): number {
        if (max === undefined) {
            throw new Error("Range undefined");
        }
        return Math.floor(Math.random() * (max - min)) + min;
    }

    _strip_dups(seq: any[]): any[] {
        return Array.from(new Set(seq));
    }

    _force_range(nor: number, max: number, min: number = 0): number {
        nor = nor ?? 0
        if (nor < min) {
            return min;
        }
        if (nor > max) {
            return max;
        }
        return nor;
    }
}