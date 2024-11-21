import { _decorator, Component, Node } from 'cc';
import { UIView } from '../../../script/framework/ui/UIView';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { OptionView } from '../game/OptionView';
import { BoardView } from '../game/BoardView';
import { Sudoku } from '../tool/Sudoku';
import { StateMachine } from '../game/StateMachine';
import { DrawView } from '../game/DrawView';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GameEvent } from '../data/GameEvent';
import { OptionCom } from '../game/com/OptionCom';
import { BlockCom } from '../game/com/BlockCom';
import { GameState } from '../data/GameState';
import { StartPanel } from './StartPanel';

const { ccclass, property } = _decorator;



const StInit: number = 0;
const StIdle: number = 1;
const StReady: number = 2;
const StPlaying: number = 3
const StShowing: number = 4;
const StFinish: number = 5;

@ccclass('GamePanel')
export class GamePanel extends UIView {

    @property(DrawView)
    drawView: DrawView = null;
    @property(BoardView)
    boardView: BoardView = null;
    @property(OptionView)
    optionView: OptionView = null;

    machine: StateMachine = null;

    start() {
        let sudoku = new Sudoku();
        sudoku.initialize();
        let board = sudoku.generate("veryHard", true);
        sudoku.print_board(board);

        this.machine = new StateMachine();
        this.machine.setCallbacks(StInit, { enter: this.onInit }, this);
        this.machine.setCallbacks(StIdle, { enter: this.onIdle }, this);
        this.machine.setCallbacks(StReady, { enter: this.onReady }, this);
        this.machine.setCallbacks(StPlaying, { enter: this.onPlaying }, this);
        this.machine.setCallbacks(StShowing, { enter: this.onShowing }, this);
        this.machine.setCallbacks(StFinish, { enter: this.onFinish }, this);

        Eventer.on(GameEvent.OnClickBlock, this.onBlockClick, this);
        Eventer.on(GameEvent.OnSelectBlock, this.onOptionClick, this);

        this.machine.state = StInit;
    }

    onInit() {
        // 初始化
        this.drawView.init();
        this.optionView.init();
        this.machine.state = StIdle;
    }

    onIdle() {
        // 开始
        UIManager.instance.open(StartPanel, () => {
            this.machine.state = StReady;
        });
    }

    onReady() {
        // 初始化牌面
        let board = GameState.boardInfo.board;
        this.boardView.init(1, board);
        this.machine.state = StPlaying;
    }

    onPlaying() {
        // 开始游戏
    }

    onShowing() {
        // 显示游戏结果
    }

    onFinish() {
        // 结束当前回合
    }

    onBlockClick(click: BlockCom) {
        this.boardView.highlightClickColor(click);
    }

    onOptionClick(option: OptionCom) {
        this.boardView.reset();
        this.optionView.reset();
        this.boardView.highlightBlockColor_all(option.value);
        this.optionView.highlightOptionColor(option);
    }

}
UIManager.instance.register(GamePanel);