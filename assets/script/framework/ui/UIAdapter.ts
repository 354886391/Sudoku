import { _decorator, Component, UITransform, View, v3, screen, ResolutionPolicy, view } from "cc";
const { ccclass, property, menu } = _decorator;

/**
 * UI自适应所有分辨率的脚本
 */
@ccclass
@menu("ui/common/UIAdapter")
export class UIAdapter extends Component {

    //是否是背景
    @property({ displayName: "是否是背景适配" })
    public isBackground: boolean = false;

    protected onLoad() {
        // this.resetResolution();
    }

    /** 初始化当前分辨率模式 */
    public static initResolution() {
        // let screenWidth = View.instance.getVisibleSize().width;
        // let screenHeight = View.instance.getVisibleSize().height;
        // let designWidth = View.instance.getDesignResolutionSize().width;
        // let designHeight = View.instance.getDesignResolutionSize().height;

        // let normalRatio = designWidth > designHeight ? designHeight / designWidth : designWidth / designHeight;
        // let currentRatio = screenWidth > screenHeight ? screenHeight / screenWidth : screenWidth / screenHeight;
        // if (currentRatio > normalRatio) {
        //     view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH);
        // } else {
        //     view.setResolutionPolicy(ResolutionPolicy.FIXED_HEIGHT);
        // }
    }

    public resetResolution() {
        let transform = this.node.getComponent(UITransform);
        // 1. 先找到 SHOW_ALL 模式适配之后，本节点的实际宽高以及初始缩放值
        let srcScaleForShowAll = Math.min(
            screen.windowSize.width / transform.width,
            screen.windowSize.height / transform.height
        );
        let realWidth = transform.width * srcScaleForShowAll;
        let realHeight = transform.height * srcScaleForShowAll;
        //背景适配
        if (this.isBackground) {
            let scale = Math.max(
                screen.windowSize.width / realWidth,
                screen.windowSize.height / realHeight
            );
            this.node.scale = v3(scale, scale, 1);
        }
        else {
            //内容适配
            transform.width *= screen.windowSize.width / realWidth;
            transform.height *= screen.windowSize.height / realHeight;
        }
    }
}
