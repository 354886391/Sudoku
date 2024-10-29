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

        let sudoku3 = generateSudoku3(3, 1);
        printSudoku3(sudoku3);
    }
}
UIManager.instance.register(GamePanel);


