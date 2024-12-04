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
import { GobeManager } from '../../../script/network/GobeManager';
import { HintDialog } from './dialog/HintDialog';
import { UIButton } from '../../../script/framework/ui/group/UIButton';
import { HintNotice } from './notice/HintNotice';
import { BlockType, Frame } from '../data/GameData';
import { RewardPanel } from './RewardPanel';

const { ccclass, property } = _decorator;

@ccclass('GamePanel')
export class GamePanel extends UIView {

    @property(DrawView)
    drawView: DrawView = null;
    @property(BoardView)
    boardView: BoardView = null;
    @property(OptionView)
    optionView: OptionView = null;
    @property(UIButton)
    closeBtn: UIButton = null;

    sudoku: Sudoku = new Sudoku();

    machine: StateMachine = null;

    start() {
        this.sudoku = new Sudoku();
        this.sudoku.initialize();

        this.machine = new StateMachine();
        this.machine.setCallbacks(EState.Init, { enter: this.onInit }, this);
        this.machine.setCallbacks(EState.Idle, { enter: this.onIdle }, this);
        this.machine.setCallbacks(EState.Ready, { enter: this.onReady }, this);
        this.machine.setCallbacks(EState.Playing, { enter: this.onPlaying }, this);
        this.machine.setCallbacks(EState.Showing, { enter: this.onShowing }, this);
        this.machine.setCallbacks(EState.Finish, { enter: this.onFinish }, this);

        this.closeBtn.touchEndedFun = this.onCloseClick.bind(this);

        Eventer.on(GameEvents.ON_BLOCK_CLICK, this.onBlockClick, this);
        Eventer.on(GameEvents.ON_OPTION_CLICK, this.onOptionClick, this);

        Eventer.on(GameEvents.ON_BLOCK_FRAME, this.onBlockFrame, this);
        Eventer.on(GameEvents.ON_OPTION_FRAME, this.onOptionFrame, this);

        this.machine.state = EState.Init;
    }

    onInit() {
        // 初始化
        GameState.initBoard("easy", true);
        this.boardView.init(1, GameState.gridBoard);
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

    onBlockClick(block: BlockCom) {
        this.boardView.highlightClickColor(block);
        // 发送frame数据
        let curBoard = this.boardView.curBoard;
        let frameInfo: Frame = {
            blockId: block.id,
            optionId: undefined,
            board: curBoard,
            steps: undefined,

        }
        GobeManager.instance.sendFrame(frameInfo);
    }

    onOptionClick(option: OptionCom) {
        let block = this.boardView.curClick;
        if (block && block.type != BlockType.Lock) {
            if (option) {
                this.boardView.reset();
                this.boardView.setBlock(block, option.value);
                this.boardView.highlightClickColor_all(option.value);
                block.isSelect = true;
                // 发送frame数据
                let curBoard = this.boardView.curBoard;
                let frameInfo: Frame = {
                    blockId: block.id,
                    optionId: option.id,
                    board: curBoard,
                    steps: undefined,
                }
                GobeManager.instance.sendFrame(frameInfo);
            }
        }
    }

    onBlockFrame(blockId: number) {
        let block = this.boardView.getBlock(blockId);
        this.boardView.highlightBlockColor2(block);
    }

    onOptionFrame(optionId: number) {
        let option = this.optionView.getOption(optionId);
    }

    onCloseClick() {
        GobeManager.instance.finishGame();
        UIManager.instance.open(HintNotice, "游戏结束");
    }

    checkReward() {
        let isWin = this.boardView.checkWin();
        if (isWin) {
            UIManager.instance.open(RewardPanel);
        }
    }
}
UIManager.instance.register(GamePanel);