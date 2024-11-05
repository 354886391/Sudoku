import { Singleton } from "../../../script/framework/util/Singleton";


const DIGITS = "123456789";
const ROWS = "ABCDEFGHI";
const MIN_GIVENS = 17;
const MAX_SQUARES = 81;
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
        difficulty = this._force_range(difficulty, MAX_SQUARES + 1, MIN_GIVENS);
        unique = unique || true;
        let blank_board = "";
        for (let i = 0; i < MAX_SQUARES; i++) {
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

    _get_all_units() {

    }

    board_string_to_grid() {

    }

    board_grid_to_string() {

    }

    print_board() {

    }

    validate_board() {

    }

    _cross(rows, cols) {

    }

    _in() {

    }

    _first_true() {

    }

    _shuffle(seq) {

    }

    _rand_range() {

    }

    _strip_dups() {

    }

    _force_range(nor: number, max: number, min: number) {
        min = min || 0;
        nor = nor || 0;
        if (nor < min) {
            return min;
        }
        if (nor > max) {
            return max;
        }
        return nor;
    }
}