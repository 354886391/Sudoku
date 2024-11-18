import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { BlockInfo, NonetInfo } from '../../data/GameData';
import { GameState } from '../../data/GameState';
import { BlockCom } from './BlockCom';

const { ccclass, property } = _decorator;

@ccclass
export class NonetCom extends Component {

    @property(Prefab)
    blockPrefab: Prefab;

    blockList: BlockCom[] = [];   // 块列表

    layout: Layout = null;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
    }

    public init(nonetId: number): void {
        this.generate(nonetId);
    }

    /** 生成九宫格 (所有id从1开始; 所有index从0开始) */
    private generate(nonetId: number): void {
        let board = GameState.boardInfo.board;
        let nonIndex = nonetId - 1;
        let colIndex = nonIndex % 3 * 3;
        let rowIndex = Math.trunc(nonIndex / 3) * 3;
        for (let row = rowIndex; row < rowIndex + 3; row++) {
            for (let col = colIndex; col < colIndex + 3; col++) {
                let value = board[row][col];
                let type = value == 0 ? 0 : 1;
                let blockInfo: BlockInfo = {
                    id: col + 1,
                    row: row,
                    col: col,
                    type: type,
                    value: value,
                    isSelect: false,
                }
                this.createBlock(nonetId, blockInfo, this.node);
            }
        }
        // 更新layout布局
        this.layout.updateLayout();
    }

    /** 创建块 (所有id从1开始; 所有index从0开始) */
    private createBlock(nonetId: number, blockInfo: BlockInfo, parent: Node): void {
        let node = instantiate(this.blockPrefab);
        let item = node.getComponent(BlockCom);
        node.setParent(parent);
        item.init(nonetId, blockInfo);
        this.blockList.push(item);
        // this.nonetInfo.blocks.push(item.blockInfo);
    }
}


