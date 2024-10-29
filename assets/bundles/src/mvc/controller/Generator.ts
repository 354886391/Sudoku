import { MathEx } from "../../../../script/framework/util/MathEx";

class SudokuGenerator {
    private grid: number[][];

    constructor() {
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    }

    // 生成一个完整的数独解决方案
    generateSolution(): boolean {
        const stack: { row: number; col: number }[] = [];
        let currentRow = 0, currentCol = 0;

        while (currentRow < 9) {
            const emptyCell = this.findRandomEmptyCellFrom(currentRow, currentCol);
            if (!emptyCell) {
                // 如果没有空单元格，说明数独已经填满，返回 true
                return true;
            }

            const [row, col] = emptyCell;
            const numbers = this.shuffleArray(Array.from({ length: 9 }, (v, k) => k + 1));

            let foundValidNumber = false;
            for (const num of numbers) {
                if (this.isValid(row, col, num)) {
                    this.grid[row][col] = num;
                    stack.push({ row, col });
                    foundValidNumber = true;
                    break;
                }
            }

            if (foundValidNumber) {
                // 移动到下一个单元格
                currentRow = row;
                currentCol = col + 1;
                if (currentCol === 9) {
                    currentRow++;
                    currentCol = 0;
                }
            } else {
                // 回溯：如果当前单元格没有有效数字，则回溯到上一个单元格
                if (stack.length === 0) {
                    // 如果栈为空，说明无法找到有效解决方案
                    return false;
                }
                const lastCell = stack.pop()!;
                this.grid[lastCell.row][lastCell.col] = 0;
                currentRow = lastCell.row;
                currentCol = lastCell.col + 1;
                if (currentCol === 9) {
                    currentRow++;
                    currentCol = 0;
                }
            }
        }
        return false;
    }

    // 新增方法：从指定位置开始查找空单元格
    findRandomEmptyCellFrom(startRow: number, startCol: number): [number, number] | null {
        for (let row = startRow; row < 9; row++) {
            for (let col = row === startRow ? startCol : 0; col < 9; col++) {
                if (this.grid[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null;
    }

    // 查找随机空单元格
    findRandomEmptyCell(): [number, number] | null {
        const emptyCells = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.grid[row][col] === 0) {
                    emptyCells.push([row, col]);
                }
            }
        }
        if (emptyCells.length === 0) return null;
        return emptyCells[MathEx.random(0, emptyCells.length - 1)];
    }

    // 检查数字是否有效
    isValid(row: number, col: number, num: number): boolean {
        for (let x = 0; x < 9; x++) {
            if (this.grid[row][x] === num || this.grid[x][col] === num) {
                return false;
            }
        }
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.grid[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    // 根据难度级别移除数字
    removeNumbers(level: number): void {
        const removalCount = this.calculateRemovalCount(level);
        let removed = 0;
        const cells = Array.from({ length: 81 }, (v, k) => k);
        this.shuffleArray(cells);
        for (const cell of cells) {
            const row = Math.floor(cell / 9);
            const col = cell % 9;
            if (this.grid[row][col] !== 0) {
                const temp = this.grid[row][col];
                this.grid[row][col] = 0;
                if (this.hasUniqueSolution()) {
                    removed++;
                } else {
                    this.grid[row][col] = temp;
                }
                if (removed >= removalCount) break;
            }
        }
    }

    // 计算要移除的数字数量
    calculateRemovalCount(level: number): number {
        switch (level) {
            case 1:
                return 30;
            case 2:
                return 40;
            case 3:
                return 50;
            default:
                return 40;
        }
    }

    // 检查数独是否有唯一解
    hasUniqueSolution(): boolean {
        const solutions: number[][][] = [];
        this.solveWithTracking(solutions);
        return solutions.length === 1;
    }

    // 解数独并记录所有解
    solveWithTracking(solutions: number[][][], maxSolutions = 2): boolean {
        const emptyCell = this.findRandomEmptyCell();
        if (!emptyCell) {
            solutions.push(this.grid.map(row => row.slice()));
            return true;
        }

        const [row, col] = emptyCell;
        const numbers = this.shuffleArray(Array.from({ length: 9 }, (v, k) => k + 1));
        for (const num of numbers) {
            if (this.isValid(row, col, num)) {
                this.grid[row][col] = num;
                if (this.solveWithTracking(solutions, maxSolutions)) {
                    if (solutions.length >= maxSolutions) return true;
                }
                this.grid[row][col] = 0;
            }
        }
        return false;
    }

    // 获取当前数独网格
    getGrid(): number[][] {
        return this.grid.map(row => row.slice());
    }

    // Fisher-Yates 洗牌算法
    shuffleArray(array: number[]): number[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = MathEx.random(0, i);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

export function generateSudoku(level: number, count: number): number[][][] {
    const sudokus: number[][][] = [];
    const generatedHashes = new Set<string>();

    while (sudokus.length < count) {
        const generator = new SudokuGenerator();
        generator.generateSolution();
        generator.removeNumbers(level);
        const newSudoku = generator.getGrid();
        const hash = JSON.stringify(newSudoku);
        if (!generatedHashes.has(hash)) {
            generatedHashes.add(hash);
            sudokus.push(newSudoku);
        }
    }
    return sudokus;
}

export function printSudoku(sudokus: number[][][]) {
    sudokus.forEach((sudoku, index) => {
        console.log(`Sudoku ${index + 1}:`);
        sudoku.forEach(row => console.log(row.join(' ')));
    });
}
