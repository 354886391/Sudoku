import { _decorator, Component, Node } from 'cc';
import { UIView } from '../../../script/framework/ui/UIView';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { OptionView } from '../game/view/OptionView';
import { BoardView } from '../game/view/BoardView';
import { Sudoku } from '../tool/Sudoku';
import { StateMachine, EState } from '../game/StateMachine';
import { DrawView } from '../game/view/DrawView';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GameEvents } from '../data/GameEvent';
import { OptionCom } from '../game/com/OptionCom';
import { BlockCom } from '../game/com/BlockCom';
import { GameState } from '../data/GameState';
import { SelectPanel } from './SelectPanel';
import { GobeManager } from '../../../script/network/GobeManager';
import { ReadyGoPanel } from './ReadyGoPanel';
import { GobeEvents } from '../../../script/network/GobeEvents';

const { ccclass, property } = _decorator;

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
        this.machine.setCallbacks(EState.Init, { enter: this.onInit }, this);
        this.machine.setCallbacks(EState.Idle, { enter: this.onIdle }, this);
        this.machine.setCallbacks(EState.Ready, { enter: this.onReady }, this);
        this.machine.setCallbacks(EState.Playing, { enter: this.onPlaying }, this);
        this.machine.setCallbacks(EState.Showing, { enter: this.onShowing }, this);
        this.machine.setCallbacks(EState.Finish, { enter: this.onFinish }, this);

        Eventer.on(GameEvents.OnClickBlock, this.onBlockClick, this);
        Eventer.on(GameEvents.OnSelectBlock, this.onOptionClick, this);
        Eventer.on(GameEvents.Show_ReadyGo, this.showReadyGo.bind(this));

        // Eventer.on(GobeEvents.ON_GAME_READY, null, this);
        // Eventer.on(GobeEvents.ON_GAME_START, null, this);
        // Eventer.on(GobeEvents.ON_GAME_END, null, this);
        // Eventer.on(GobeEvents.ON_GAME_321, null, this);

        this.machine.state = EState.Init;

        let log = window.console.log.bind(window.console, '%c【调试】', 'color: white; background-color: #007BFF; font-weight: bold; font-size: 14px;');
        log("游戏开始", 1, 2, 3, 4, 5);
    }

    onInit() {
        // 初始化
        this.drawView.init();
        this.optionView.init();
        this.machine.state = EState.Idle;
    }

    onIdle() {
        // 开始
        // UIManager.instance.open(SelectPanel, () => {
        //     this.machine.state = EState.Ready;
        // });
    }

    onReady() {
        // 初始化牌面
        let board = GameState.boardInfo.board;
        this.boardView.init(1, board);
        this.machine.state = EState.Playing;
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

    showReadyGo() {
        // ready GO
        UIManager.instance.open(ReadyGoPanel, () => {
            GobeManager.instance.startGame();
        });
    }

    _isGameing: boolean = false;
    _startGameTime: number = 0;
    
    /**
    * 开始帧同步操作
    */
    private _onStartGame() {

    }

}
UIManager.instance.register(GamePanel);