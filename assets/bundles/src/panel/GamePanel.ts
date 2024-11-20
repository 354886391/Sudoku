import { _decorator, Component, Node } from 'cc';
import { UIView } from '../../../script/framework/ui/UIView';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { OptionView } from '../game/OptionView';
import { BoardView } from '../game/BoardView';
import { Sudoku } from '../tool/Sudoku';

const { ccclass, property } = _decorator;

@ccclass('GamePanel')
export class GamePanel extends UIView {

    @property(BoardView)
    clickRegion: BoardView = null;
    @property(OptionView)
    selectRegion: OptionView = null;

    start() {
        this.clickRegion.init(1);
        // this.selectRegion.init();

        let sudoku = new Sudoku();
        sudoku.initialize();
        let board = sudoku.generate("veryHard", true);
        sudoku.print_board(board);
    }
}
UIManager.instance.register(GamePanel);