import { _decorator, Node, Component, Animation } from "cc";
import { UIManager } from "../../../script/framework/ui/UIManager";
import { UIView } from "../../../script/framework/ui/UIView";
import { UIButton } from "../../../script/framework/ui/group/UIButton";
import { GobeManager } from "../../../script/network/GobeManager";
import { ReadyPanel } from "./ReadyPanel";
import { HintDialog } from "./dialog/HintDialog";
import { LoadNotice } from "./notice/LoadNotice";

const { ccclass, property } = _decorator;

@ccclass
export class SelectPanel extends UIView {

    @property(UIButton)
    createRoomAIBtn: UIButton = null;
    @property(UIButton)
    createRoomBtn: UIButton = null;
    @property(UIButton)
    matchRoomBtn: UIButton = null;
    // @property(UIButton)
    // joinRoomBtn: UIButton = null;
    @property(UIButton)
    closeBtn: UIButton = null;

    callback: Function = null;

    public init(callback: Function): void {
        Log.w("SelectPanel init");
        this.callback = callback;

        this.createRoomAIBtn.touchEndedFun = this.onCreateRoomAIClick.bind(this);   // 人机
        this.createRoomBtn.touchEndedFun = this.onCreateRoomClick.bind(this);       // 创建
        this.matchRoomBtn.touchEndedFun = this.onMatchRoomClick.bind(this);         // 匹配
        // this.joinRoomBtn.touchEndedFun = this.onJoinRoomClick.bind(this);
        this.closeBtn.touchEndedFun = this.onCloseClick.bind(this);
    }

    /** 创建人机房间 */
    public onCreateRoomAIClick(): void {
        Log.d("SelectPanel--> onCreateRoomAIClick");
        UIManager.instance.open(LoadNotice);
        GobeManager.instance.createRoomAI(() => {
            // ready
            this.showReady();
        }, () => {
            UIManager.instance.open(HintDialog, "房间创建失败");
        });
    }

    /** 创建房间 */
    public onCreateRoomClick(): void {
        Log.d("SelectPanel--> onCreateRoomClick");
        UIManager.instance.open(LoadNotice);
        GobeManager.instance.createRoom(() => {
            // ready
            this.showReady();
        }, () => {
            UIManager.instance.open(HintDialog, "房间创建失败");
        });
    }

    /** 匹配房间 */
    public onMatchRoomClick(): void {
        Log.d("SelectPanel--> onMatchRoomClick");
        UIManager.instance.open(LoadNotice);
        GobeManager.instance.matchRoom(() => {
            // ready
            this.showReady();
        }, () => {
            UIManager.instance.open(HintDialog, "房间匹配失败");
        });
    }

    // public onJoinRoomClick(): void {
    //     Log.d("SelectPanel--> onJoinRoomClick");
    //     UIManager.instance.open(LoadNotice);
    //     GobeManager.instance.joinRoom("", () => {
    //         // ready
    //         this.showReady();
    //     }, () => {
    //         UIManager.instance.open(HintDialog, "房间加入失败");
    //     });
    // }

    showReady() {
        // ready
        UIManager.instance.open(ReadyPanel);
        UIManager.instance.close(LoadNotice);
        this.onCloseClick();
    }


    public onCloseClick(): void {
        this.callback && this.callback();
        UIManager.instance.close(SelectPanel);
    }
}

UIManager.instance.register(SelectPanel);