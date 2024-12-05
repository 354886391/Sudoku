import { _decorator, Component, Node } from 'cc';
import { UIView } from '../../../script/framework/ui/UIView';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { OptionView } from '../game/view/OptionView';
import { BoardView } from '../game/view/BoardView';
import { Sudoku } from '../tool/Sudoku';
import { DrawView } from '../game/view/DrawView';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GameEvents } from '../data/GameEvent';
import { OptionCom } from '../game/com/OptionCom';
import { BlockCom } from '../game/com/BlockCom';
import { GameState } from '../data/GameState';
import { GobeManager } from '../../../script/network/GobeManager';
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

    sudoku: Sudoku = null;

    onLoad() {
        this.sudoku = new Sudoku();
        this.sudoku.initialize();

        this.closeBtn.touchEndedFun = this.onCloseClick.bind(this);
        Eventer.on(GameEvents.ON_BLOCK_CLICK, this.onBlockClick, this);
        Eventer.on(GameEvents.ON_OPTION_CLICK, this.onOptionClick, this);
        Eventer.on(GameEvents.ON_BLOCK_FRAME, this.onBlockFrame, this);
        Eventer.on(GameEvents.ON_OPTION_FRAME, this.onOptionFrame, this);

        this.init();
    }

    init() {
        // 初始化
        GameState.initBoard("easy", true);
        this.boardView.init();
        this.drawView.init();
        this.optionView.init();
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
        LogEX.warn("onBlockClick-->  frameInfo: ", frameInfo);
        GobeManager.instance.sendFrame(frameInfo);

        let block2 = this.boardView.getBlock(block.id);
        LogEX.warn("onBlockClick-->  block2: ", block2);
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
                LogEX.warn("onOptionClick-->  frameInfo: ", frameInfo);
                GobeManager.instance.sendFrame(frameInfo);
            }
        }
    }

    onBlockFrame(blockId: number) {
        LogEX.warn("onBlockFrame-->  blockId: ", blockId);
        let block = this.boardView.getBlock(blockId);
        this.boardView.highlightBlockColor2(block);
    }

    onOptionFrame(optionId: number) {
        LogEX.warn("onOptionFrame-->  blockId: ", optionId);
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