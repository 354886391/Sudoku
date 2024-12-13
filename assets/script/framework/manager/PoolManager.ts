import { _decorator, Prefab, Node, instantiate, NodePool } from "cc";
import { Singleton } from "../util/Singleton";
const { ccclass, property } = _decorator;

@ccclass("PoolManager")
export class PoolManager extends Singleton<PoolManager>() {

    private _dictPool: any = {}

    /**
     * 根据预设从对象池中获取对应节点
     */
    public getNode(prefab: Prefab | Node, parent?: Node) {
        let node: Node = null;
        let name: string = prefab.name;
        if (this._dictPool.hasOwnProperty(name)) {
            // 已有对应的对象池
            let pool = this._dictPool[name];
            if (pool.size() > 0) {
                node = pool.get();
            } else {
                if (prefab instanceof Prefab) {
                    node = instantiate(prefab);
                } else {
                    node = instantiate(prefab);
                }
            }
        } else {
            // 没有对应对象池，创建它！
            let pool = new NodePool();
            this._dictPool[name] = pool;
            if (prefab instanceof Prefab) {
                node = instantiate(prefab);
            } else {
                node = instantiate(prefab);
            }
        }
        node.parent = parent;
        node.active = true;
        return node;
    }

    /**
     * 将对应节点放回对象池中
     */
    public putNode(node: Node) {
        if (!node) {
            return;
        }
        let pool = null;
        let name = node.name;
        if (this._dictPool.hasOwnProperty(name)) {
            // 已有对应的对象池
            pool = this._dictPool[name];
        } else {
            // 没有对应对象池，创建他！
            pool = new NodePool();
            this._dictPool[name] = pool;
        }
        pool.put(node);
    }

    /**
     * 根据名称，清除对应对象池
     */
    public clearPool(name: string) {
        if (this._dictPool.hasOwnProperty(name)) {
            let pool = this._dictPool[name];
            pool.clear();
        }
    }

    /**
    * 预生成对象池
    * @param prefab 
    * @param nodeNum 
    */
    public prePool(prefab: Prefab | Node, nodeNum: number) {
        const name = prefab.name;
        let pool = new NodePool();
        this._dictPool[name] = pool;
        for (let i = 0; i < nodeNum; i++) {
            if (prefab instanceof Prefab) {
                pool.put(instantiate(prefab));
            } else {
                pool.put(instantiate(prefab));
            }
        }
    }
}
