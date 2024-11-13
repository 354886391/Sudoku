// this.js

export class Sudoku {

    DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];    // Allowed this.DIGITS
    ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9];         // Row lables
    COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9];       // Column lables
    SQUARES = null;             // Square IDs

    UNITS = null;               // All units (row, column, or box)
    SQUARE_UNITS_MAP = null;    // Squares -> units map
    SQUARE_PEERS_MAP = null;    // Squares -> peers map

    MIN_GIVENS = 17;            // Minimum number of givens 
    NR_SQUARES = 81;            // Number of squares

    // Define difficulties by how many squares are given to the player in a new
    // puzzle.
    DIFFICULTY = {
        "easy": 62,
        "medium": 53,
        "hard": 44,
        "very-hard": 35,
        "insane": 26,
        "inhuman": 17,
    };

    // Blank character and board representation
    BLANK_CHAR = 0;
    BLANK_BOARD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Init
    // -------------------------------------------------------------------------
    initialize() {
        /* Initialize the Sudoku library (invoked after library load)
        */
        this.SQUARES = this._cross(this.ROWS, this.COLS);
        this.UNITS = this._get_all_units(this.ROWS, this.COLS);
        this.SQUARE_UNITS_MAP = this._get_square_units_map(this.SQUARES, this.UNITS);
        this.SQUARE_PEERS_MAP = this._get_square_peers_map(this.SQUARES,
            this.SQUARE_UNITS_MAP);
    }

    // Generate
    // -------------------------------------------------------------------------
    generate(difficulty, unique?) {
        /* 生成特定难度的数独谜题，例如：
 
             // 生成一个“简单”的数独谜题
             this.generate("easy");
 
         难度如下，表示给定的方格数量：
 
                 "easy":         61
                 "medium":       52
                 "hard":         43
                 "very-hard":    34
                 "insane":       25
                 "inhuman":      17
 
         你也可以输入自定义的给定方格数量，例如：
 
             // 生成一个有 60 个给定方格的数独谜题
             this.generate(60)
 
         `difficulty` 必须是一个介于 17 和 81 之间的数字。如果超出这个范围，`difficulty` 将被设置为最近的边界值，
         例如，0 -> 17，100 -> 81。
 
         默认情况下，谜题是唯一的，除非将 `unique` 设置为 false。
         （注意：谜题唯一性尚未实现，因此不能保证有唯一解）
 
         TODO: 实现谜题唯一性
         */

        // 如果 `difficulty` 是字符串或未定义，将其转换为数字或默认为 "easy"
        if (typeof difficulty === "string" || typeof difficulty === "undefined") {
            difficulty = this.DIFFICULTY[difficulty] || this.DIFFICULTY.easy;
        }

        // 强制 `difficulty` 在 17 到 81 之间
        difficulty = this._force_range(difficulty, this.MIN_GIVENS, this.NR_SQUARES + 1);

        // 默认 `unique` 为 true
        unique = unique || true;

        // 获取所有方格及其所有可能的候选值
        let blankBoard = "";
        for (let i = 0; i < this.NR_SQUARES; i++) {
            blankBoard += this.BLANK_CHAR;
        }
        let candidates = this._get_candidates_map(blankBoard);

        // 对方格列表进行洗牌
        let shuffledSquares = this._shuffle(this.SQUARES);
        for (const square of shuffledSquares) {
            // 如果随机选择的赋值导致矛盾，放弃并重新尝试
            const randCandidateIdx = this._rand_range(candidates[square].length);
            const randCandidate = candidates[square][randCandidateIdx];
            if (!this._assign(candidates, square, randCandidate)) {
                break;
            }

            // 创建所有单候选值的列表
            let singleCandidates: string[] = [];
            for (const s of this.SQUARES) {
                if (candidates[s].length === 1) {
                    singleCandidates.push(candidates[s][0]);
                }
            }

            // 如果我们有足够的给定方格，并且唯一的候选值数量至少为 8，返回谜题
            if (singleCandidates.length >= difficulty && this._strip_dups(singleCandidates).length >= 8) {
                let board = "";
                let givensIdxs: number[] = [];
                for (let i = 0; i < this.SQUARES.length; i++) {
                    const square = this.SQUARES[i];
                    if (candidates[square].length === 1) {
                        board += candidates[square][0];
                        givensIdxs.push(i);
                    } else {
                        board += this.BLANK_CHAR;
                    }
                }

                // 如果给定方格数量超过 `difficulty`，随机移除一些给定方格，直到数量正好为 `difficulty`
                let nrGivens = givensIdxs.length;
                if (nrGivens > difficulty) {
                    givensIdxs = this._shuffle(givensIdxs);
                    for (let i = 0; i < nrGivens - difficulty; i++) {
                        const target = givensIdxs[i];
                        board = board.substr(0, target) + this.BLANK_CHAR + board.substr(target + 1);
                    }
                }

                // 双重检查谜题是否可解
                // TODO: 实现独立的谜题检查器。求解很耗时。
                if (this.solve(board)) {
                    return board;
                }
            }
        }

        // 放弃并尝试新的谜题
        return this.generate(difficulty);
    };

    // Solve
    // -------------------------------------------------------------------------
    solve(board, reverse?) {
        /* Solve a sudoku puzzle given a sudoku `board`, i.e., an 81-character 
        string of this.DIGITS, 1-9, and spaces identified by '.', representing the
        squares. There must be a minimum of 17 givens. If the given board has no
        solutions, return false.
        
        Optionally set `reverse` to solve "backwards", i.e., rotate through the
        possibilities in reverse. Useful for checking if there is more than one
        solution.
        */

        // Assure a valid board
        var report = this.validate_board(board);
        if (report !== true) {
            throw report;
        }

        // Check number of givens is at least MIN_GIVENS
        var nr_givens = 0;
        for (var i in board) {
            if (board[i] !== this.BLANK_CHAR && this._in(board[i], this.DIGITS)) {
                ++nr_givens;
            }
        }
        if (nr_givens < this.MIN_GIVENS) {
            throw "Too few givens. Minimum givens is " + this.MIN_GIVENS;
        }

        // Default reverse to false
        reverse = reverse || false;

        var candidates = this._get_candidates_map(board);
        var result = this._search(candidates, reverse);

        if (result) {
            var solution = "";
            for (var square in result) {
                solution += result[square];
            }
            return solution;
        }
        return false;
    };

    get_candidates(board) {
        /* Return all possible candidatees for each square as a grid of 
        candidates, returnning `false` if a contradiction is encountered.
        
        Really just a wrapper for this._get_candidates_map for programmer
        consumption.
        */

        // Assure a valid board
        var report = this.validate_board(board);
        if (report !== true) {
            throw report;
        }

        // Get a candidates map
        var candidates_map = this._get_candidates_map(board);

        // If there's an error, return false
        if (!candidates_map) {
            return false;
        }

        // Transform candidates map into grid
        var rows = [];
        var cur_row = [];
        var i = 0;
        for (var square in candidates_map) {
            var candidates = candidates_map[square];
            cur_row.push(candidates);
            if (i % 9 == 8) {
                rows.push(cur_row);
                cur_row = [];
            }
            ++i;
        }
        return rows;
    }

    _get_candidates_map(board) {
        /* Get all possible candidates for each square as a map in the form
        {square: this.DIGITS} using recursive constraint propagation. Return `false` 
        if a contradiction is encountered
        */

        // Assure a valid board
        var report = this.validate_board(board);
        if (report !== true) {
            throw report;
        }

        var candidate_map = {};
        var squares_values_map = this._get_square_vals_map(board);

        // Start by assigning every digit as a candidate to every square
        for (var si in this.SQUARES) {
            candidate_map[this.SQUARES[si]] = this.DIGITS;
        }

        // For each non-blank square, assign its value in the candidate map and
        // propigate.
        for (var square in squares_values_map) {
            var val = squares_values_map[square];

            if (this._in(val, this.DIGITS)) {
                var new_candidates = this._assign(candidate_map, square, val);

                // Fail if we can't assign val to square
                if (!new_candidates) {
                    return false;
                }
            }
        }

        return candidate_map;
    };

    _search(candidates, reverse?) {
        /* 给定一个从方格到候选值的映射，使用深度优先搜索递归尝试所有可能的值，直到找到解决方案或返回 false 表示无解 */

        // 如果上一次迭代中有错误，返回 false
        if (!candidates) {
            return false;
        }

        // 默认 reverse 为 false
        reverse = reverse || false;

        // 如果每个方格只有一个候选值，表示谜题已解决！返回候选值映射
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

        // 选择候选值最少且大于 1 的空白方格
        let minNrCandidates = 10;
        let minCandidatesSquare = null;
        for (const square of this.SQUARES) {
            const nrCandidates = candidates[square].length;

            if (nrCandidates < minNrCandidates && nrCandidates > 1) {
                minNrCandidates = nrCandidates;
                minCandidatesSquare = square;
            }
        }

        // 递归搜索该方格的所有候选值，从候选值最少的开始

        // 顺序遍历候选值
        const minCandidates = candidates[minCandidatesSquare];
        if (!reverse) {
            for (const val of minCandidates) {
                // 深拷贝 candidates
                const candidatesCopy = JSON.parse(JSON.stringify(candidates));
                const candidatesNext = this._search(
                    this._assign(candidatesCopy, minCandidatesSquare, val)
                );

                if (candidatesNext) {
                    return candidatesNext;
                }
            }

            // 反向遍历候选值
        } else {
            for (let vi = minCandidates.length - 1; vi >= 0; vi--) {
                const val = minCandidates[vi];

                // 深拷贝 candidates
                const candidatesCopy = JSON.parse(JSON.stringify(candidates));
                const candidatesNext = this._search(
                    this._assign(candidatesCopy, minCandidatesSquare, val),
                    reverse
                );

                if (candidatesNext) {
                    return candidatesNext;
                }
            }
        }

        // 如果遍历完候选值最少的方格的所有组合仍未找到答案，表示无解。返回 false
        return false;
    };

    _assign(candidates, square, val) {
        /* Eliminate all values, *except* for `val`, from `candidates` at 
        `square` (candidates[square]), and propagate. Return the candidates map
        when finished. If a contradiciton is found, return false.
        
        WARNING: This will modify the contents of `candidates` directly.
        */

        // Grab a list of canidates without 'val'
        var other_vals = candidates[square].replace(val, "");

        // Loop through all other values and eliminate them from the candidates 
        // at the current square, and propigate. If at any point we get a 
        // contradiction, return false.
        for (var ovi in other_vals) {
            var other_val = other_vals[ovi];

            var candidates_next =
                this._eliminate(candidates, square, other_val);

            if (!candidates_next) {
                //console.log("Contradiction found by _eliminate.");
                return false;
            }
        }

        return candidates;
    };

    _eliminate(candidates, square, val) {
        /* Eliminate `val` from `candidates` at `square`, (candidates[square]),
        and propagate when values or places <= 2. Return updated candidates,
        unless a contradiction is detected, in which case, return false.
        
        WARNING: This will modify the contents of `candidates` directly.
        */

        // If `val` has already been eliminated from candidates[square], return
        // with candidates.
        if (!this._in(val, candidates[square])) {
            return candidates;
        }

        // Remove `val` from candidates[square]
        candidates[square] = candidates[square].replace(val, '');

        // If the square has only candidate left, eliminate that value from its 
        // peers
        var nr_candidates = candidates[square].length;
        if (nr_candidates === 1) {
            var target_val = candidates[square];

            for (var pi in this.SQUARE_PEERS_MAP[square]) {
                var peer = this.SQUARE_PEERS_MAP[square][pi];

                var candidates_new =
                    this._eliminate(candidates, peer, target_val);

                if (!candidates_new) {
                    return false;
                }
            }

            // Otherwise, if the square has no candidates, we have a contradiction.
            // Return false.
        } if (nr_candidates === 0) {
            return false;
        }

        // If a unit is reduced to only one place for a value, then assign it
        for (var ui in this.SQUARE_UNITS_MAP[square]) {
            var unit = this.SQUARE_UNITS_MAP[square][ui];

            var val_places = [];
            for (var si in unit) {
                var unit_square = unit[si];
                if (this._in(val, candidates[unit_square])) {
                    val_places.push(unit_square);
                }
            }

            // If there's no place for this value, we have a contradition!
            // return false
            if (val_places.length === 0) {
                return false;

                // Otherwise the value can only be in one place. Assign it there.
            } else if (val_places.length === 1) {
                var candidates_new =
                    this._assign(candidates, val_places[0], val);

                if (!candidates_new) {
                    return false;
                }
            }
        }

        return candidates;
    };


    // Square relationships
    // -------------------------------------------------------------------------
    // Squares, and their relationships with values, units, and peers.

    _get_square_vals_map(board) {
        /* Return a map of squares -> values
        */
        var squares_vals_map = {};

        // Make sure `board` is a string of length 81
        if (board.length != this.SQUARES.length) {
            throw "Board/squares length mismatch.";

        } else {
            for (var i in this.SQUARES) {
                squares_vals_map[this.SQUARES[i]] = board[i];
            }
        }

        return squares_vals_map;
    };

    _get_square_units_map(squares, units) {
        /* Return a map of `squares` and their associated units (row, col, box)
        */
        var square_unit_map = {};

        // For every square...
        for (var si in squares) {
            var cur_square = squares[si];

            // Maintain a list of the current square's units
            var cur_square_units = [];

            // Look through the units, and see if the current square is in it,
            // and if so, add it to the list of of the square's units.
            for (var ui in units) {
                var cur_unit = units[ui];

                if (cur_unit.indexOf(cur_square) !== -1) {
                    cur_square_units.push(cur_unit);
                }
            }

            // Save the current square and its units to the map
            square_unit_map[cur_square] = cur_square_units;
        }

        return square_unit_map;
    };

    _get_square_peers_map(squares, units_map) {
        /* Return a map of `squares` and their associated peers, i.e., a set of
        other squares in the square's unit.
        */
        var square_peers_map = {};

        // For every square...
        for (var si in squares) {
            var cur_square = squares[si];
            var cur_square_units = units_map[cur_square];

            // Maintain list of the current square's peers
            var cur_square_peers = [];

            // Look through the current square's units map...
            for (var sui in cur_square_units) {
                var cur_unit = cur_square_units[sui];

                for (var ui in cur_unit) {
                    var cur_unit_square = cur_unit[ui];

                    if (cur_square_peers.indexOf(cur_unit_square) === -1 &&
                        cur_unit_square !== cur_square) {
                        cur_square_peers.push(cur_unit_square);
                    }
                }
            }

            // Save the current square an its associated peers to the map
            square_peers_map[cur_square] = cur_square_peers;
        }

        return square_peers_map;
    };

    _get_all_units(rows, cols) {
        /* Return a list of all units (rows, cols, boxes)
        */
        var units = [];

        // Rows
        for (var ri in rows) {
            units.push(this._cross(rows[ri], cols));
        }

        // Columns
        for (var ci in cols) {
            units.push(this._cross(rows, cols[ci]));
        }

        // Boxes
        var row_squares = ["ABC", "DEF", "GHI"];
        var col_squares = ["123", "456", "789"];
        for (var rsi in row_squares) {
            for (var csi in col_squares) {
                units.push(this._cross(row_squares[rsi], col_squares[csi]));
            }
        }

        return units;
    };


    // Conversions
    // -------------------------------------------------------------------------
    board_string_to_grid(board_string) {
        /* 将棋盘字符串转换为二维数组 */
        const rows: string[][] = [];
        let cur_row: string[] = [];
        for (let i = 0; i < board_string.length; i++) {
            cur_row.push(board_string[i]);
            if (i % 9 === 8) {
                rows.push(cur_row);
                cur_row = [];
            }
        }
        return rows;
    };

    board_grid_to_string(board_grid) {
        /* Convert a board grid to a string
        */
        var board_string = "";
        for (var r = 0; r < 9; ++r) {
            for (var c = 0; c < 9; ++c) {
                board_string += board_grid[r][c];
            }
        }
        return board_string;
    };


    // Utility
    // -------------------------------------------------------------------------

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
    };

    validate_board(board) {
        /* Return if the given `board` is valid or not. If it's valid, return
        true. If it's not, return a string of the reason why it's not.
        */

        // Check for empty board
        if (!board) {
            return "Empty board";
        }

        // Invalid board length
        if (board.length !== this.NR_SQUARES) {
            return "Invalid board size. Board must be exactly " + this.NR_SQUARES +
                " squares.";
        }

        // Check for invalid characters
        for (var i in board) {
            if (!this._in(board[i], this.DIGITS) && board[i] !== this.BLANK_CHAR) {
                return "Invalid board character encountered at index " + i +
                    ": " + board[i];
            }
        }

        // Otherwise, we're good. Return true.
        return true;
    };

    _cross(a, b) {
        /* Cross product of all elements in `a` and `b`, e.g.,
        this._cross("abc", "123") ->
        ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"]
        */
        var result = [];
        for (var ai in a) {
            for (var bi in b) {
                result.push(a[ai] + b[bi]);
            }
        }
        return result;
    };

    _in(v, seq) {
        /* Return if a value `v` is in sequence `seq`.
        */
        return seq.indexOf(v) !== -1;
    };

    _first_true(seq) {
        /* Return the first element in `seq` that is true. If no element is
        true, return false.
        */
        for (var i in seq) {
            if (seq[i]) {
                return seq[i];
            }
        }
        return false;
    };

    _shuffle(seq) {
        /* 返回 `seq` 的一个打乱版本 */

        // 创建一个与 `seq` 大小相同但填充为 false 的数组
        let shuffled: any[] = new Array(seq.length).fill(null);

        // 遍历原始数组，随机放置元素到新数组中
        for (let i = 0; i < seq.length; i++) {
            let ti = this._rand_range(seq.length);

            // 确保目标位置未被占用
            while (shuffled[ti] !== null) {
                ti = (ti + 1) % seq.length;
            }

            shuffled[ti] = seq[i];
        }

        return shuffled;
    };

    _rand_range(max, min?) {
        /* Get a random integer in the range of `min` to `max` (non inclusive).
        If `min` not defined, default to 0. If `max` not defined, throw an 
        error.
        */
        min = min || 0;
        if (max) {
            return Math.floor(Math.random() * (max - min)) + min;
        } else {
            throw "Range undefined";
        }
    };

    _strip_dups(seq) {
        /* Strip duplicate values from `seq`
        */
        var seq_set = [];
        var dup_map = {};
        for (var i in seq) {
            var e = seq[i];
            if (!dup_map[e]) {
                seq_set.push(e);
                dup_map[e] = true;
            }
        }
        return seq_set;
    };

    _force_range(nr, max, min?) {
        /* Force `nr` to be within the range from `min` to, but not including, 
        `max`. `min` is optional, and will default to 0. If `nr` is undefined,
        treat it as zero.
        */
        min = min || 0
        nr = nr || 0
        if (nr < min) {
            return min;
        }
        if (nr > max) {
            return max;
        }
        return nr
    }
}

// Initialize library after load
// initialize();

// Pass whatever the root object is, lsike 'window' in browsers