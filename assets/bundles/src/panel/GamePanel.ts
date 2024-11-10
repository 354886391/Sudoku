import { _decorator, Component, Node } from 'cc';
import { ClickRegion } from '../game/ClickRegion';
import { UIView } from '../../../script/framework/ui/UIView';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { SelectRegion } from '../game/SelectRegion';
import { Sudoku } from '../tool/Sudoku';

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

        // Sudoku.instance.initialize();
        // let sudoku = Sudoku.instance.generate(56, 1);
        // Sudoku.instance.print_board(sudoku);


        // let sudoku3 = generateSudoku3(3, 3);
        // printSudoku3(sudoku3);

        let sudoku = new Sudoku();

        sudoku.initialize();
        let board = sudoku.generate("hard", 1);
        sudoku.print_board(board);
        board = sudoku.solve(board);
        sudoku.print_board(board);
    }
}
UIManager.instance.register(GamePanel);