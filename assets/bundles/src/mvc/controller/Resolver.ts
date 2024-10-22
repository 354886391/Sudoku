// export class Resolver {
//     private static _instance: Resolver = null;
//     public static get instance(): Resolver {
//         if (Resolver._instance == null) {
//             Resolver._instance = new Resolver();
//         }
//         return Resolver._instance;
//     }

//     public solveSudoku(board: number[][]) {
//         return this.backtrack(board, 0, 0);
//     }

//     private backtrack(board: number[][], row: number, col: number): boolean {
//         let m = 9, n = 9;
//         // 
//         if (row == m) {
//             return true;
//         }
//         // 换行
//         if (col == n) {
//             return this.backtrack(board, row + 1, 0);
//         }
//         // 有预设数字
//         if (board[row][col] > 0) {
//             return this.backtrack(board, row, col + 1);
//         }
//         // 遍历数字
//         for (let i = 1; i <= 9; i++) {
//             // 判断是否可以填入
//             if (this.isValid(board, row, col, i)) {
//                 board[row][col] = i;
//                 // 递归
//                 if (this.backtrack(board, row, col + 1)) {
//                     return true;
//                 }
//                 // 回溯
//                 board[row][col] = 0;
//             }
//         }
//         // 穷举完 1~9，依然没有找到可行解，此路不通
//         return false;
//     }

//     private isValid(board: number[][], row: number, col: number, num: number): boolean {
//         for (let i = 0; i < 9; i++) {
//             // 判断行
//             if (board[row][i] == num) {
//                 return false;
//             }
//             // 判断列
//             if (board[i][col] == num) {
//                 return false;
//             }
//             // 判断九宫格
//             let rowStart = Math.trunc(row / 3) * 3 + Math.trunc(i / 3);
//             let colStart = Math.trunc(col / 3) * 3 + Math.trunc(i % 3);
//             if (board[rowStart][colStart] == num) {
//                 return false;
//             }
//         }
//         return true;
//     }
// }

/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
    backtrack(board, 0, 0);
};

function backtrack(board: string[][], row: number, col: number): boolean {
    let m = 9, n = 9;
    // 
    if (row == m) {
        return true;
    }
    // 换行
    if (col == n) {
        return backtrack(board, row + 1, 0);
    }
    // 有预设数字
    if (board[row][col] != '.') {
        return backtrack(board, row, col + 1);
    }
    // 遍历数字
    for (let i = 1; i <= 9; i++) {
        // 判断是否可以填入
        if (isValid(board, row, col, `${i}`)) {
            board[row][col] = `${i}`;
            // 递归
            if (backtrack(board, row, col + 1)) {
                return true;
            }
            // 回溯
            board[row][col] = '.';
        }
    }
    // 穷举完 1~9，依然没有找到可行解，此路不通
    return false;
}

function isValid(board: string[][], row: number, col: number, num: string): boolean {
    for (let i = 0; i < 9; i++) {
        // 判断行
        if (board[row][i] == num) {
            return false;
        }
        // 判断列
        if (board[i][col] == num) {
            return false;
        }
        // 判断九宫格
        let rowStart = Math.trunc(row / 3) * 3 + Math.trunc(i / 3);
        let colStart = Math.trunc(col / 3) * 3 + Math.trunc(i % 3);
        if (board[rowStart][colStart] == num) {
            return false;
        }
    }
    return true;
}