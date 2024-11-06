import { _decorator, Component, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('MoveBg')
export class MoveBg extends Component {

    @property(Node)
    target1ToMove:Node = null;
    @property(Node)
    target2ToMove:Node = null;

    private moveSpeed:number = 100;

    private _canMove: boolean = false;

    start() {
        this.moveSpeed = GameManager.inst().moveSpeed;
    }

    update(deltaTime: number) {
        if (!this._canMove) return;

        const moveDistance = this.moveSpeed * deltaTime;

        const p1 = this.target1ToMove.getPosition();
        this.target1ToMove.setPosition(p1.x - moveDistance, p1.y);
        const p2 = this.target2ToMove.getPosition();
        this.target2ToMove.setPosition(p2.x - moveDistance, p2.y);

        if (p1.x < -730) {
            const p2 = this.target2ToMove.getPosition();
            this.target1ToMove.setPosition(p2.x + 725, p1.y);
        }
        if (p2.x < -730) {
            const p1 = this.target1ToMove.getPosition();
            this.target2ToMove.setPosition(p1.x + 725, p2.y);
        }
    }

    public enableMove() {
        this._canMove = true;
    }

    public disableMove() {
        this._canMove = false;
    }
}

