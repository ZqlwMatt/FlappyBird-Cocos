import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GamjeManager')
export class GameManager extends Component {

    private static _inst: GameManager = null;
    public static inst(): GameManager {
        if (!this._inst) {
            this._inst = new GameManager();
        }
        return this._inst;
    }

    @property
    moveSpeed: number = 100;

    onLoad() {
        GameManager._inst = this;
    }
 
    start() {

    }

    update(deltaTime: number) {
        
    }
}

