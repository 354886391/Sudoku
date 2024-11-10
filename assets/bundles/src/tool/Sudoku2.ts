import { Singleton } from "../../../script/framework/util/Singleton";

const DIGITS = "123456789";         // Allowed sudoku.DIGITS
const ROWS = "ABCDEFGHI";           // Row lables
const COLS = "123456789";
const MIN_GIVENS = 17;
const NR_SQUARES = 81;
const BLANK_CHAR = ".";

const DIFFICULTY = {
    easy: 61,
    medium: 52,
    hard: 43,
    veryHard: 34,
    insane: 25,
    inhuman: 17
};
type Difficulty = 'easy' | 'medium' | 'hard' | 'veryHard' | 'insane' | 'inhuman';

export class Sudoku2 extends Singleton<Sudoku2>() {

    UNITS = null;
    SQUARES = null;

    SQUARE_UNITS_MAP = null;
    SQUARE_PEERS_MAP = null;

    initialize() {
        /**
         * 初始化数独库（在库加载后调用）
         */
        this.SQUARES = this._cross(ROWS, COLS);
        this.UNITS = this._get_all_units(ROWS, COLS);
        this.SQUARE_UNITS_MAP = this._get_square_units_map(this.SQUARES, this.UNITS);
        this.SQUARE_PEERS_MAP = this._get_square_peers_map(this.SQUARES, this.SQUARE_UNITS_MAP);
    }

    generate(difficulty, unique?) {
        /**
         * // 生成一个“简单”的数独谜题
         * sudoku.generate("easy");
         * 您也可以输入自定义的已知方格数量，例如：
         * sudoku.generate(60)
         * `difficulty` 必须在17到81之间（包括17和81）。如果超出此范围，`difficulty` 将被设置为最接近的边界，例如 0 -> 17，100 -> 81。
         * 默认情况下，谜题是唯一的，除非您将 `unique` 设置为 `false`。（注意：谜题唯一性尚未实现，因此不能保证谜题有唯一解）
         * TODO: 实现谜题唯一性
         */
        // 如果 `difficulty` 是字符串或未定义，将其转换为数字或默认为 "easy"
        if (typeof difficulty === "string" || typeof difficulty === "undefined") {
            difficulty = DIFFICULTY[difficulty] || DIFFICULTY.easy;
        }
        // 强制 `difficulty` 在17到81之间
        difficulty = this._force_range(difficulty, NR_SQUARES + 1, MIN_GIVENS);
        // 默认 `unique` 为 true
        unique = unique || true;
        // 获取一个空白棋盘和每个方格的所有可能候选值
        let blank_board = '';
        for (let i = 0; i < NR_SQUARES; ++i) {
            blank_board += BLANK_CHAR;
        }
        let candidates = this._get_candidates_map(blank_board);
        // 对方格列表进行洗牌
        let shuffled_squares = this._shuffle(this.SQUARES);
        for (let si in shuffled_squares) {
            let square = shuffled_squares[si];
            // 如果随机选择的赋值导致矛盾，放弃并重新尝试
            let rand_candidate_idx = this._rand_range(candidates[square].length);
            let rand_candidate = candidates[square][rand_candidate_idx];
            if (!this._assign(candidates, square, rand_candidate)) {
                break;
            }
            // 列出所有单候选值
            let single_candidates: string[] = [];
            for (let si in this.SQUARES) {
                let square = this.SQUARES[si];
                if (candidates[square].length === 1) {
                    single_candidates.push(candidates[square]);
                }
            }
            // 如果我们有足够的已知方格，并且单候选值的数量至少为8，返回谜题
            if (single_candidates.length >= difficulty && this._strip_dups(single_candidates).length >= 8) {
                let board = '';
                let givens_idxs: number[] = [];
                for (let i in this.SQUARES) {
                    let square = this.SQUARES[i];
                    if (candidates[square].length === 1) {
                        board += candidates[square];
                        givens_idxs.push(parseInt(i));
                    } else {
                        board += BLANK_CHAR;
                    }
                }
                // 如果已知方格数量超过 `difficulty`，随机移除一些已知方格，直到数量正好为 `difficulty`
                let nr_givens = givens_idxs.length;
                if (nr_givens > difficulty) {
                    givens_idxs = this._shuffle(givens_idxs);
                    for (let i = 0; i < nr_givens - difficulty; ++i) {
                        let target = givens_idxs[i];
                        board = board.substr(0, target) + BLANK_CHAR + board.substr(target + 1);
                    }
                }
                // 双重检查棋盘是否可解
                // TODO: 创建一个独立的棋盘检查器。求解是昂贵的。
                if (this.solve(board)) {
                    return board;
                }
            }
        }
        // 放弃并尝试新的谜题
        return this.generate(difficulty);
    }

    solve(board, reverse?) {
        /**
         * 给定一个数独 `board`，即一个由数独.DIGITS（1-9）和表示空格的 '.' 组成的81个字符的字符串，
         * 解决数独谜题。必须至少有17个已知数字。如果给定的棋盘没有解决方案，返回 `false`。
         *
         * 可选地设置 `reverse` 以反向解决，即逆序遍历可能性。这对于检查是否有多个解决方案很有用。
         */

        // 确保有效的棋盘
        const report = this.validate_board(board);
        if (report !== true) {
            throw new Error(report);
        }

        // 检查已知数字的数量是否至少为 MIN_GIVENS
        let nr_givens = 0;
        for (let i = 0; i < board.length; i++) {
            if (board[i] !== BLANK_CHAR && this._in(board[i], DIGITS)) {
                nr_givens++;
            }
        }
        if (nr_givens < MIN_GIVENS) {
            throw new Error(`Too few givens. Minimum givens is ${MIN_GIVENS}`);
        }

        // 默认 reverse 为 false
        reverse = reverse || false;

        const candidates = this._get_candidates_map(board);
        const result = this._search(candidates, reverse);

        if (result) {
            let solution = '';
            for (const square in result) {
                solution += result[square];
            }
            return solution;
        }
        return false;
    }


    get_candidates(board) {
        /**
        * 返回每个方格的所有可能候选值作为候选值网格，如果遇到矛盾则返回 `false`。
        * 实际上只是 `sudoku._get_candidates_map` 的包装器，方便程序员使用。
        */
        // 确保有效的棋盘
        const report = this.validate_board(board);
        if (report !== true) {
            throw new Error(report);
        }
        // 获取候选值映射
        const candidates_map = this._get_candidates_map(board);
        // 如果有错误，返回 false
        if (!candidates_map) {
            return false;
        }
        // 将候选值映射转换为网格
        const rows: string[][] = [];
        let cur_row: string[] = [];
        let i = 0;
        for (const square in candidates_map) {
            const candidates = candidates_map[square];
            cur_row.push(candidates);
            if (i % 9 === 8) {
                rows.push(cur_row);
                cur_row = [];
            }
            ++i;
        }
        return rows;
    }

    _get_candidates_map(board: string) {
        /**
         * 使用递归约束传播获取每个方格的所有可能候选值，返回形式为 {square: sudoku.DIGITS} 的映射。
         * 如果遇到矛盾，则返回 `false`。
         */
        // 确保有效的棋盘
        const report = this.validate_board(board);
        if (report !== true) {
            throw new Error(report);
        }
        const candidate_map = {};
        const squares_values_map = this._get_square_vals_map(board);
        // 开始时将每个数字作为每个方格的候选值
        for (const si in this.SQUARES) {
            candidate_map[this.SQUARES[si]] = DIGITS;
        }
        // 对于每个非空白方格，将其值分配到候选值映射中并传播
        for (const square in squares_values_map) {
            const val = squares_values_map[square];
            if (this._in(val, DIGITS)) {
                const new_candidates = this._assign(candidate_map, square, val);

                // 如果无法将值分配到方格，则失败
                if (!new_candidates) {
                    return false;
                }
            }
        }
        return candidate_map;
    }

    _search(candidates, reverse?) {
        /* 给定一个方格到候选值的映射，使用深度优先搜索递归尝试所有可能的值，
        * 直到找到解决方案，或者如果没有解决方案则返回 false。
        */

        // 如果上一次迭代中有错误，返回 false
        if (!candidates) {
            return false;
        }

        // 默认 reverse 为 false
        reverse = reverse || false;

        // 如果每个方格只有一个候选值，那么谜题已解决！返回候选值映射。
        let maxNrCandidates = 0;
        let maxCandidatesSquare = null;
        for (const square of this.SQUARES) {
            const nrCandidates = candidates[square].length;

            if (nrCandidates > maxNrCandidates) {
                maxNrCandidates = nrCandidates;
                maxCandidatesSquare = square;
            }
        }
        if (maxNrCandidates === 1) {
            return candidates;
        }

        // 选择具有最少可能性 > 1 的空白方格
        let minNrCandidates = 10;
        let minCandidatesSquare = null;
        for (const square of this.SQUARES) {
            const nrCandidates = candidates[square].length;

            if (nrCandidates < minNrCandidates && nrCandidates > 1) {
                minNrCandidates = nrCandidates;
                minCandidatesSquare = square;
            }
        }

        // 递归地搜索该方格的每个候选值，从候选值最少的方格开始。

        // 顺向遍历候选值
        const minCandidates = candidates[minCandidatesSquare!];
        if (!reverse) {
            for (const val of minCandidates) {
                // TODO: 实现一个非冗余的深拷贝函数
                const candidatesCopy = JSON.parse(JSON.stringify(candidates));
                const candidatesNext = this._search(this._assign(candidatesCopy, minCandidatesSquare!, val));

                if (candidatesNext) {
                    return candidatesNext;
                }
            }

            // 逆向遍历候选值
        } else {
            for (let i = minCandidates.length - 1; i >= 0; --i) {
                const val = minCandidates[i];

                // TODO: 实现一个非冗余的深拷贝函数
                const candidatesCopy = JSON.parse(JSON.stringify(candidates));
                const candidatesNext = this._search(this._assign(candidatesCopy, minCandidatesSquare!, val), reverse);

                if (candidatesNext) {
                    return candidatesNext;
                }
            }
        }

        // 如果遍历完具有最少候选值的方格的所有组合仍未找到答案，则没有解决方案。返回 false。
        return false;
    }

    _assign(candidates, square, val) {
        /* 从 `candidates` 中消除所有值，除了 `val`，并传播。返回更新后的 `candidates`，
         * 如果检测到矛盾，则返回 false。
         *
         * 警告：这将直接修改 `candidates` 的内容。
         */
        // 获取不包括 `val` 的候选值列表
        const otherVals = candidates[square].replace(val, "");
        // 遍历所有其他值，并从当前方格的候选值中消除它们，同时传播。如果在任何点检测到矛盾，返回 false
        for (const otherVal of otherVals) {
            const candidatesNext = this._eliminate(candidates, square, otherVal);

            if (!candidatesNext) {
                // console.log("Contradiction found by _eliminate.");
                return false;
            }
        }
        return candidates;
    }

    _eliminate(candidates, square, val) {
        /* 从 `candidates` 中消除 `val`，并在值或位置 <= 2 时传播。返回更新后的 `candidates`，
        * 如果检测到矛盾，则返回 false。
        *
        * 警告：这将直接修改 `candidates` 的内容。
        */
        // 如果 `val` 已经从 `candidates[square]` 中消除，直接返回 `candidates`
        if (!this._in(val, candidates[square])) {
            return candidates;
        }
        // 从 `candidates[square]` 中移除 `val`
        candidates[square] = candidates[square].replace(val, '');
        // 如果该方格只剩下一个候选值，从其同辈方格中消除该值
        const nrCandidates = candidates[square].length;
        if (nrCandidates === 1) {
            const targetVal = candidates[square];

            for (const peer of this.SQUARE_PEERS_MAP[square]) {
                const candidatesNew = this._eliminate(candidates, peer, targetVal);

                if (!candidatesNew) {
                    return false;
                }
            }
            // 否则，如果该方格没有候选值，我们有矛盾，返回 false
        } else if (nrCandidates === 0) {
            return false;
        }
        // 如果一个单元中某个值只能在一个地方出现，则分配该值
        for (const unit of this.SQUARE_UNITS_MAP[square]) {
            const valPlaces = [];

            for (const unitSquare of unit) {
                if (this._in(val, candidates[unitSquare])) {
                    valPlaces.push(unitSquare);
                }
            }
            // 如果该值没有地方可以放，我们有矛盾，返回 false
            if (valPlaces.length === 0) {
                return false;
                // 否则，该值只能在一个地方出现，分配该值
            } else if (valPlaces.length === 1) {
                const candidatesNew = this._assign(candidates, valPlaces[0], val);
                if (!candidatesNew) {
                    return false;
                }
            }
        }
        return candidates;
    }

    _get_square_vals_map(board) {
        /* 返回一个映射表，记录每个方格及其对应的值 */
        const squaresValsMap = {};
        // 确保 `board` 是长度为 81 的字符串
        if (board.length !== this.SQUARES.length) {
            throw new Error("Board/squares length mismatch.");
        } else {
            for (let i = 0; i < this.SQUARES.length; i++) {
                squaresValsMap[this.SQUARES[i]] = board[i];
            }
        }
        return squaresValsMap;
    }

    _get_square_units_map(squares, units) {
        /* 返回一个映射表，记录每个方格及其相关的单元（行、列、宫） */
        const squareUnitMap = {};
        // 遍历所有方格
        for (const curSquare of squares) {
            // 维护当前方格的单元列表
            const curSquareUnits = [];
            // 遍历所有单元，查看当前方格是否在其中，如果是，则将其添加到当前方格的单元列表中
            for (const curUnit of units) {
                if (curUnit.includes(curSquare)) {
                    curSquareUnits.push(curUnit);
                }
            }
            // 将当前方格及其单元列表保存到映射表中
            squareUnitMap[curSquare] = curSquareUnits;
        }
        return squareUnitMap;
    }

    _get_square_peers_map(squares, unitsMap) {
        /* 返回一个映射表，记录每个方格及其相关的同辈方格，即同一单元内的其他方格。 */
        const squarePeersMap = {};
        // 遍历所有方格
        for (const curSquare of squares) {
            const curSquareUnits = unitsMap[curSquare];
            const curSquarePeers = new Set();

            // 遍历当前方格所属的所有单元
            for (const curUnit of curSquareUnits) {
                // 遍历当前单元中的所有方格
                for (const curUnitSquare of curUnit) {
                    if (curUnitSquare !== curSquare) {
                        curSquarePeers.add(curUnitSquare);
                    }
                }
            }
            // 将当前方格及其同辈列表保存到映射表中
            squarePeersMap[curSquare] = Array.from(curSquarePeers);
        }
        return squarePeersMap;
    }

    _get_all_units(rows, cols) {
        /* Return a list of all units (rows, cols, boxes) */
        let units: string[][] = [];

        // Rows
        for (let ri = 0; ri < rows.length; ri++) {
            units.push(this._cross(rows[ri], cols));
        }

        // Columns
        for (let ci = 0; ci < cols.length; ci++) {
            units.push(this._cross(rows, cols[ci]));
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

    board_string_to_grid(board_string) {
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

    board_grid_to_string(board_grid) {
        /* Convert a board grid to a string */
        var board_string = "";
        for (var r = 0; r < 9; ++r) {
            for (var c = 0; c < 9; ++c) {
                board_string += board_grid[r][c];
            }
        }
        return board_string;
    }

    print_board(board) {
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

    validate_board(board) {
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

    _cross(a, b) {
        const result = [];
        for (let ai of a) {
            for (let bi of b) {
                result.push(ai + bi);
            }
        }
        return result;
    }

    _in(v: any, seq) {
        return seq.indexOf(v) !== -1;
    }

    _first_true(seq) {
        return seq.find(value => value == true);
    }

    _shuffle(seq) {
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
    _rand_range(max, min = 0) {
        if (max === undefined) {
            throw new Error("Range undefined");
        }
        return Math.floor(Math.random() * (max - min)) + min;
    }

    _strip_dups(seq) {
        return Array.from(new Set(seq));
    }

    _force_range(nor, max, min = 0) {
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