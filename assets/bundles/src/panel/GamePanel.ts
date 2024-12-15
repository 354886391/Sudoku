import { _decorator, Component, Node, Prefab } from 'cc';
import { UIView } from '../../../script/framework/ui/UIView';
import { UIManager } from '../../../script/framework/ui/UIManager';
import { OptionView } from '../game/view/OptionView';
import { BoardView } from '../game/view/BoardView';
import { DrawView } from '../game/view/DrawView';
import { Eventer } from '../../../script/framework/tool/Eventer';
import { GameEvents } from '../data/GameEvent';
import { OptionCom } from '../game/com/OptionCom';
import { BLANK, BlockCom } from '../game/com/BlockCom';
import { GameState } from '../data/GameState';
import { UIButton } from '../../../script/framework/ui/group/UIButton';
import { HintNotice } from './notice/HintNotice';
import { BLOCK_TYPE, Frame } from '../data/GameDefine';
import { RewardPanel } from './RewardPanel';
import { BlockColor } from '../data/GameConst';
import { GobeManager } from '../../../script/network/GobeManager';
import { PoolManager } from 'db://assets/script/framework/manager/PoolManager';
import { RES_GAME } from '../data/GameConfig';
import { ResourceManager } from 'db://assets/script/framework/resources/ResourceManager';
import { TimerView } from '../game/view/TimerView';

const { ccclass, property } = _decorator;

@ccclass
export class GamePanel extends UIView {

    @property(DrawView)
    drawView: DrawView = null;
    @property(BoardView)
    boardView: BoardView = null;
    @property(OptionView)
    optionView: OptionView = null;
    @property(TimerView)
    timerView: TimerView = null;

    @property(UIButton)
    candidateBtn: UIButton = null;
    @property(UIButton)
    clearBtn: UIButton = null;
    @property(UIButton)
    closeBtn: UIButton = null;

    onLoad() {
        let lblPrefab = ResourceManager.getBy<Prefab>(RES_GAME.lblPrefab);
        PoolManager.instance.prePool(lblPrefab, 81);
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
        // this.boardView.initCandidate(GameState.candidatesBoard);
    }

    onBlockClick(block: BlockCom) {
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
        if (block && block.type != BLOCK_TYPE.LOCK) {
            if (option) {
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
    
    onClearBtnClick() {
        let block = this.boardView.curClick;
        if (block && block.type != BLOCK_TYPE.LOCK) {
            // 发送frame数据
            let frameInfo: Frame = {
                blockId: -block.id, // 使用-blockId作为标记，表示清除
                optionId: undefined,
                board: this.boardView.curBoard,
                steps: undefined,
            }
            LogEX.info("onClearBtnClick-->  frameInfo: ", frameInfo);
            GobeManager.instance.sendFrame(frameInfo);
        }
    }

    onHandleFrame(playerId: string, frame: Frame) {
        LogEX.info("onBlockFrame-->  playerId: ", playerId, frame);
        let blockId = frame.blockId;
        let optionId = frame.optionId;
        let isClear = blockId < 0;
        blockId = Math.abs(blockId);
        let block = this.boardView.getBlock(blockId);
        if (block && isClear) {
            this.boardView.setBlock(block, BLANK);
            this.boardView.resetAllBlocks(false);
            return;
        }
        if (GobeManager.instance.isOwnPlayer(playerId)) {
            if (block) {
                this.boardView.onClickBlockBGColor(block);
                let option = this.optionView.getOption(optionId);
                if (option && block.type != BLOCK_TYPE.LOCK) {
                    block.isSelect = true;
                    this.boardView.setBlock(block, option.value);
                    this.boardView.setClickBlockBGColor(block, true);
                }
            }
        } else {
            // 其他玩家点击了block和option
            if (blockId && optionId) {
                let block = this.boardView.getBlock(blockId);
                if (block) {
                    block.type = BLOCK_TYPE.OTHER;
                    block.setBlockBGColor(BlockColor.LightPink);
                }
            }
        }
    }

    hasCandidate: boolean = false;

    onCandidateBtnClick() {
        if (this.hasCandidate) {
            this.hasCandidate = false;
            this.boardView.clearAllCandidates();
        } else {
            this.hasCandidate = true;
            this.boardView.initCandidate(GameState.candidatesBoard);
        }
    }

    onCloseBtnClick() {
        GameState.isGaming = false;
        GobeManager.instance.finishGame();
        UIManager.instance.open(HintNotice, "游戏结束");
    }

    checkReward() {
        let isWin = this.boardView.checkWin();
        if (isWin) {
            UIManager.instance.open(RewardPanel);
        }
    }

    getCandidate(blockId: number) {
        let col = Math.floor((blockId - 1) / 9);
        let row = (blockId - 1) % 9;
        return GameState.candidatesBoard[col][row];
    }

    protected onDestroy(): void {
        Eventer.offHandler(GameEvents.ON_BLOCK_CLICK, this.onBlockClick);
        Eventer.offHandler(GameEvents.ON_OPTION_CLICK, this.onOptionClick);
        Eventer.offHandler(GameEvents.ON_FRAME_REC, this.onHandleFrame);
    }
}
UIManager.instance.register(GamePanel);