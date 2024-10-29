class SudokuGenerator {
    private grid: number[][];

    constructor() {
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    }

    // 生成一个完整的数独解决方案
    generateSolution(): boolean {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(row, col, num)) {
                            this.grid[row][col] = num;
                            if (this.generateSolution()) {
                                return true;
                            }
                            this.grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
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
        const removalCount = level * 8; // 简单示例，实际应用中可能需要更复杂的逻辑
        let removed = 0;
        while (removed < removalCount) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (this.grid[row][col] !== 0) {
                this.grid[row][col] = 0;
                removed++;
            }
        }
    }

    // 获取当前数独网格
    getGrid(): number[][] {
        return this.grid;
    }
}

export function generateSudoku3(level: number, count: number): number[][][] {
    const sudokus: number[][][] = [];
    for (let i = 0; i < count; i++) {
        const generator = new SudokuGenerator();
        generator.generateSolution();
        generator.removeNumbers(level);
        sudokus.push(generator.getGrid());
    }
    return sudokus;
}

export function printSudoku3(sudokus: number[][][]): void {
    sudokus.forEach((sudoku, index) => {
        console.log(`Sudoku ${index + 1}:`);
        sudoku.forEach(row => console.log(row.join(' ')));
    });
}