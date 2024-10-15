/**
     * @zh 遍历该节点的子树里的所有节点并按规则执行回调函数。
     * 对子树中的所有节点，包含当前节点，会执行两次回调，preFunc 会在访问它的子节点之前调用，postFunc 会在访问所有子节点之后调用。
     * 这个函数的实现不是基于递归的，而是基于栈展开递归的方式。
     * 请不要在 walk 过程中对任何其他的节点嵌套执行 walk。
     * @param preFunc The callback to process node when reach the node for the first time
     * @param postFunc The callback to process node when re-visit the node after walked all children in its sub tree
     * @example
     * ```
     * node.walk(function (target) {
     *     console.log('Walked through node ' + target.name + ' for the first time');
     * }, function (target) {
     *     console.log('Walked through node ' + target.name + ' after walked all children in its sub tree');
     * });
     * ```
     */
    //  public walk (preFunc: (target: Node) => void, postFunc?: (target: Node) => void): void {
    //     let index = 1;
    //     let children: Node[] | null = null;
    //     let curr: Node | null = null;
    //     let i = 0;
    //     let stack = Node._stacks[Node._stackId];
    //     if (!stack) {
    //         stack = [];
    //         Node._stacks.push(stack);
    //     }
    //     Node._stackId++;

    //     stack.length = 0;
    //     stack[0] = this;
    //     let parent: Node | null = null;
    //     let afterChildren = false;
    //     while (index) {
    //         index--;
    //         curr = stack[index] as (Node | null);
    //         if (!curr) {
    //             continue;
    //         }
    //         if (!afterChildren && preFunc) {
    //             // pre call
    //             preFunc(curr);
    //         } else if (afterChildren && postFunc) {
    //             // post call
    //             postFunc(curr);
    //         }

    //         // Avoid memory leak
    //         stack[index] = null;
    //         // Do not repeatedly visit child tree, just do post call and continue walk
    //         if (afterChildren) {
    //             if (parent === this._parent) break;
    //             afterChildren = false;
    //         } else {
    //             // Children not proceeded and has children, proceed to child tree
    //             if (curr._children.length > 0) {
    //                 parent = curr;
    //                 children = curr._children;
    //                 i = 0;
    //                 stack[index] = children[i];
    //                 index++;
    //             } else {
    //                 stack[index] = curr;
    //                 index++;
    //                 afterChildren = true;
    //             }
    //             continue;
    //         }
    //         // curr has no sub tree, so look into the siblings in parent children
    //         if (children) {
    //             i++;
    //             // Proceed to next sibling in parent children
    //             if (children[i]) {
    //                 stack[index] = children[i];
    //                 index++;
    //             } else if (parent) {
    //                 stack[index] = parent;
    //                 index++;
    //                 // Setup parent walk env
    //                 afterChildren = true;
    //                 if (parent._parent) {
    //                     children = parent._parent._children;
    //                     i = children.indexOf(parent);
    //                     parent = parent._parent;
    //                 } else {
    //                     // At root
    //                     parent = null;
    //                     children = null;
    //                 }

    //                 // ERROR
    //                 if (i < 0) {
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    //     stack.length = 0;
    //     Node._stackId--;
    // }