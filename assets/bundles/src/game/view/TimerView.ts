import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from '../GameManager';
import { GameState } from '../../data/GameState';
const { ccclass, property } = _decorator;

@ccclass('TimerView')
export class TimerView extends Component {

    @property(Label)
    timerLbl: Label = null;

    start() {

    }

    update(deltaTime: number) {
        this.timerLbl.string = "简单: " + this.convertSecondsToTime(GameState.remainTime);
    }

    convertSecondsToTime(totalSeconds: number) {
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return this.padStart(String(minutes), 2, '0') + ':' + this.padStart(String(seconds), 2, '0');
    }

    padStart(str: string, targetLength: number, padString: string): string {
        while (str.length < targetLength) {
            str = padString + str;
        }
        return str;
    }
}


