import { _decorator, Component, Node } from 'cc';
import { UIView } from '../../../script/framework/ui/UIView';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { OptionView } from '../game/view/OptionView';
import { BoardView } from '../game/view/BoardView';
import { DrawView } from '../game/view/DrawView';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GameEvents } from '../data/GameEvent';
import { OptionCom } from '../game/com/OptionCom';
import { BlockCom } from '../game/com/BlockCom';
import { GameState } from '../data/GameState';
import { UIButton } from '../../../script/framework/ui/group/UIButton';
import { HintNotice } from './notice/HintNotice';
import { BLOCK_TYPE, Frame } from '../data/GameDefine';
import { RewardPanel } from './RewardPanel';
import { BlockColor } from '../data/GameConst';
import { GobeManager } from '../../../script/network/GobeManager';

const { ccclass, property } = _decorator;

@ccclass
export class GamePanel extends UIView {

    @property(DrawView)
    drawView: DrawView = null;
    @property(BoardView)
    boardView: BoardView = null;
    @property(OptionView)
    optionView: OptionView = null;
    @property(UIButton)
    closeBtn: UIButton = null;

    onLoad() {
        this.closeBtn.touchEndedFun = this.onCloseClick.bind(this);
        Eventer.on(GameEvents.ON_BLOCK_CLICK, this.onBlockClick, this);
        Eventer.on(GameEvents.ON_OPTION_CLICK, this.onOptionClick, this);
        Eventer.on(GameEvents.ON_FRAME_REC, this.onHandleFrame, this);
    }

    protected start(): void {
        this.initGame();
    }

    initGame() {
        // 初始化
        this.drawView.init();
        this.optionView.init();
    }

    initBoard() {
        this.boardView.init(GameState.gridBoard);
        this.boardView.initCandidate(GameState.candidatesBoard);
    }

    onBlockClick(block: BlockCom) {
        // this.boardView.highlightClickBlockColor(block);
        // 发送frame数据
        let frameInfo: Frame = {
            blockId: block.id,
            optionId: undefined,
            board: this.boardView.curBoard,
            steps: undefined,
        }
        LogEX.info("onBlockClick-->  frameInfo: ", frameInfo);
        GobeManager.instance.sendFrame(frameInfo);
    }

    onOptionClick(option: OptionCom) {
        let block = this.boardView.curClick;
        if (block && block.type != BLOCK_TYPE.Lock) {
            if (option) {
                // this.boardView.reset();
                // this.boardView.setBlock(block, option.value);
                // this.boardView.highlightBlockResultColor(option.value);
                // block.isSelect = true;
                // 发送frame数据
                let frameInfo: Frame = {
                    blockId: block.id,
                    optionId: option.id,
                    board: this.boardView.curBoard,
                    steps: undefined,
                }
                LogEX.info("onOptionClick-->  frameInfo: ", frameInfo);
                GobeManager.instance.sendFrame(frameInfo);
            }
        }
    }

    onHandleFrame(playerId: string, frame: Frame) {
        LogEX.info("onBlockFrame-->  playerId: ", playerId, frame);
        let blockId = frame.blockId;
        let optionId = frame.optionId;
        if (GobeManager.instance.isOwnPlayer(playerId)) {
            let block: BlockCom = null;
            if (blockId) {
                block = this.boardView.getBlock(blockId);
                this.boardView.highlightClickBlockColor(block);
                if (optionId) {
                    let option = this.optionView.getOption(optionId);
                    if (block && block.type != BLOCK_TYPE.Lock) {
                        if (option) {
                            this.boardView.reset();
                            this.boardView.setBlock(block, option.value);
                            this.boardView.highlightBlockResultColor(option.value);
                            block.isSelect = true;
                        }
                    }
                }
            }
        } else {
            // 擦除 option 使用 -optionId表示
            if (blockId && optionId) {
                let block = this.boardView.getBlock(blockId);
                this.boardView.setBlockColor(block, BlockColor.Red);
            }
        }
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