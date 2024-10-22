import { _decorator, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { GameState } from '../data/GameState';
import { ClickBlock } from './ClickBlock';
import { NonetInfo } from '../data/GameData';
const { ccclass, property } = _decorator;

@ccclass('ClickNonet')
export class ClickNonet extends Component {

    @property(Prefab)
    blockPrefab: Prefab;

    nonetInfo: NonetInfo;
    blockList: ClickBlock[] = [];   // 块列表
    
    layout: Layout = null;

    protected onLoad(): void {
        this.layout = this.getComponent(Layout);
    }

    public init(nonetId: number): void {
        this.nonetInfo = {
            id: nonetId,
            blocks: [],
        }
        this.generate(nonetId);
    }

    /** 生成九宫格 (所有id从1开始; 所有index从0开始) */
    private generate(nonetId: number): void {
        let nonetList = GameState.gameData.region[nonetId];
        for (let i = 0; i < nonetList.length; i++) {
            const blockId = i + 1;
            const blockVal = nonetList[i];
            this.createBlock(nonetId, blockId, blockVal, this.node);
        }
    }

    /** 创建块 (所有id从1开始; 所有index从0开始) */
    private createBlock(nonetId: number, blockId: number, blockVal: number, parent: Node): void {
        let node = instantiate(this.blockPrefab);
        let item = node.getComponent(ClickBlock);
        node.setParent(parent);
        item.init(nonetId, blockId, blockVal);
        this.blockList.push(item);
        this.nonetInfo.blocks.push(item.blockInfo);

        // 更新layout布局
        this.layout.updateLayout();
    }

    // 
    get nonetId() {
        return this.nonetInfo.id;
    }

    get blocksInfo() {
        return this.nonetInfo.blocks;
    }
}


