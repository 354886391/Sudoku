class Column {
    up: Column | null = null;
    down: Column | null = null;
    left: Column | null = null;
    right: Column | null = null;
    col: Column | null = null;
    row: number;

    size: number = 0;
    name: string | null = null;

    static createByName(name: string): Column {
        let col = new Column();
        col.name = name;
        return col;
    }

    static createByRow(row: number) {
        let node = new Column();
        node.row = row;
        return node;
    }
}

class DancingLinks {
    private head: Column;

    constructor() {
        this.head = new Column();
        this.head.right = this.head;
        this.head.left = this.head;

        // 添加所有可能的列
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                this.addColumn(`R${row}C${col}`);
                for (let num = 1; num <= 9; num++) {
                    this.addColumn(`R${row}N${num}`);
                    this.addColumn(`C${col}N${num}`);
                    this.addColumn(`B${Math.floor(row / 3)}${Math.floor(col / 3)}N${num}`);
                }
            }
        }
    }

    addColumn(name: string): void {
        const col = Column.createByName(name);
        col.right = this.head.right;
        col.left = this.head;
        this.head.right!.left = col;
        this.head.right = col;
    }

    addRow(row: number[], colNames: string[]): void {
        const firstNode = Column.createByRow(row[0]);
        let current = firstNode;
        for (let i = 1; i < row.length; i++) {
            const node = Column.createByRow(row[i]);
            current.right = node;
            node.left = current;
            current = node;
        }
        current.right = firstNode;
        firstNode.left = current;

        for (let i = 0; i < row.length; i++) {
            const col = this.findColumn(colNames[i]);
            if (col) {
                firstNode.col = col;
                firstNode.up = col.up;
                firstNode.down = col;
                col.up!.down = firstNode;
                col.up = firstNode;
                col.size++;
            } else {
                throw new Error(`Column ${colNames[i]} not found`);
            }
        }
    }

    findColumn(name: string): Column | null {
        let col = this.head.right;
        while (col !== this.head) {
            if (col.name === name) {
                return col;
            }
            col = col.right!;
        }
        return null;
    }

    cover(column: Column): void {
        column.right!.left = column.left;
        column.left!.right = column.right;
        let row = column.down;
        while (row !== column) {
            let right = row!.right;
            while (right !== row) {
                right!.down!.up = right!.up;
                right!.up!.down = right!.down;
                right!.col!.size--;
                right = right!.right;
            }
            row = row!.down;
        }
    }

    uncover(column: Column): void {
        let row = column.up;
        while (row !== column) {
            let left = row!.left;
            while (left !== row) {
                left!.col!.size++;
                left!.down!.up = left;
                left!.up!.down = left;
                left = left!.left;
            }
            row = row!.up;
        }
        column.right!.left = column;
        column.left!.right = column;
    }

    search(k: number, solution: Column[][], solutions: Column[][][]): boolean {
        if (this.head.right === this.head) {
            solutions.push(solution.slice());
            return true;
        }

        let col = this.chooseColumn();
        this.cover(col!);

        let row = col!.down;
        while (row !== col) {
            solution[k] = [row];
            let right = row!.right;
            while (right !== row) {
                this.cover(right!.col!);
                right = right!.right;
            }
            if (this.search(k + 1, solution, solutions)) {
                return true;
            }
            right = row!.left;
            while (right !== row) {
                this.uncover(right!.col!);
                right = right!.left;
            }
            row = row!.down;
        }
        this.uncover(col!);
        return false;
    }

    chooseColumn(): Column | null {
        let minSize = Infinity;
        let col: Column | null = null;
        let c = this.head.right;
        while (c !== this.head) {
            if (c.size < minSize) {
                minSize = c.size;
                col = c;
            }
            c = c.right!;
        }
        return col;
    }

    solve(solutions: Column[][][]): boolean {
        return this.search(0, [], solutions);
    }
}
class SudokuGenerator {
    private grid: number[][];
    private dlx: DancingLinks;

    constructor() {
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        this.dlx = new DancingLinks();

        // 初始化DLX矩阵
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                for (let num = 1; num <= 9; num++) {
                    const cols = [
                        `R${row}C${col}`,
                        `R${row}N${num}`,
                        `C${col}N${num}`,
                        `B${Math.floor(row / 3)}${Math.floor(col / 3)}N${num}`
                    ];
                    this.dlx.addRow([row * 81 + col * 9 + num - 1], cols);
                }
            }
        }
    }

    // 生成一个完整的数独解决方案
    generateSolution(): boolean {
        const emptyCell = this.findRandomEmptyCell();
        if (!emptyCell) return true;

        const [row, col] = emptyCell;
        const numbers = this.shuffleArray(Array.from({ length: 9 }, (_, i) => i + 1));
        for (const num of numbers) {
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
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
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
        const cells = Array.from({ length: 81 }, (_, i) => i);
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
        const solutions: Column[][][] = [];
        this.dlx.solve(solutions);
        return solutions.length === 1;
    }

    // 获取当前数独网格
    getGrid(): number[][] {
        return this.grid.map(row => row.slice());
    }

    // Fisher-Yates 洗牌算法
    shuffleArray(array: number[]): number[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // 添加一行到DLX矩阵
    addRow(row: number, col: number, num: number): void {
        const cols = [
            `R${row}C${col}`,
            `R${row}N${num}`,
            `C${col}N${num}`,
            `B${Math.floor(row / 3)}${Math.floor(col / 3)}N${num}`
        ];
        this.dlx.addRow([row * 81 + col * 9 + num - 1], cols);
    }

    // 使用DLX解决数独
    solve(): number[][] | null {
        const solutions: Column[][][] = [];
        if (this.dlx.solve(solutions)) {
            if (solutions.length > 0) {
                const solution = solutions[0];
                const result = Array.from({ length: 9 }, () => Array(9).fill(0));
                for (const rowNodes of solution) {
                    const node = rowNodes[0];
                    const rowIndex = Math.floor(node.row / 81);
                    const colIndex = Math.floor((node.row % 81) / 9);
                    const num = (node.row % 9) + 1;
                    result[rowIndex][colIndex] = num;
                }
                return result;
            }
        }
        return null;
    }
}
export function generateSudoku2(level: number, count: number): number[][][] {
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

export function printSudoku2(sudokus: number[][][]): void {
    sudokus.forEach((sudoku, index) => {
        console.log(`Sudoku ${index + 1}:`);
        sudoku.forEach(row => console.log(row.join(' ')));
    });
}