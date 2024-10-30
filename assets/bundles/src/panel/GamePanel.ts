import { _decorator, Component, Node } from 'cc';
import { ClickRegion } from '../game/ClickRegion';
import { UIView } from '../../../script/framework/ui/UIView';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { SelectRegion } from '../game/SelectRegion';
import { generateSudoku2, printSudoku2 } from '../mvc/controller/Generator2';
import { generateSudoku, printSudoku } from '../mvc/controller/Generator';
import { generateSudoku3, printSudoku3 } from '../mvc/controller/Generator3';
const { ccclass, property } = _decorator;

@ccclass('GamePanel')
export class GamePanel extends UIView {

    @property(ClickRegion)
    clickRegion: ClickRegion = null;
    @property(SelectRegion)
    selectRegion: SelectRegion = null;

    start() {
        // this.clickRegion.init(1);
        // this.selectRegion.init();

        // let sudoku = generateSudoku(3, 1);
        // printSudoku(sudoku);

        // let sudoku2 = generateSudoku2(3, 1);
        // printSudoku2(sudoku2);

        // let sudoku3 = generateSudoku3(3, 3);
        // printSudoku3(sudoku3);

        const board = [
            [0, 0, 3, 0, 5, 6, 7, 8, 9],
            [0, 5, 6, 7, 8, 9, 1, 0, 3],
            [7, 8, 9, 1, 2, 3, 0, 5, 6],
            [2, 1, 4, 3, 0, 5, 8, 9, 0],
            [3, 6, 5, 0, 0, 7, 2, 1, 0],
            [8, 9, 0, 2, 0, 0, 3, 6, 5],
            [5, 3, 0, 6, 4, 0, 0, 7, 0],
            [0, 4, 2, 9, 7, 8, 0, 3, 0],
            [9, 0, 8, 5, 0, 1, 6, 4, 0]
        ];

        // 计算 0 的数量
        const countZeros = (board: number[][]): number => {
            let count = 0;
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (board[row][col] === 0) {
                        count++;
                    }
                }
            }
            return count;
        };

        console.log(`这串数字中有 ${countZeros(board)} 个 0`);
    }
}
UIManager.instance.register(GamePanel);


