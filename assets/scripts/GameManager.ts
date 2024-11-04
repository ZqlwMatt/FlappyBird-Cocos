import { _decorator, Component, Node } from 'cc';
import { Bird } from './Bird';
import { MoveBg } from './MoveBg';
import { PipeSpawner } from './PipeSpawner';
const { ccclass, property } = _decorator;

enum GameState {
    Ready,
    Playing,
    GameOver
}

@ccclass('GameManager')
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

    @property(Bird)
    bird: Bird = null;
    @property(MoveBg)
    moveBg: MoveBg = null;
    @property(MoveBg)
    moveLand: MoveBg = null;

    gameState: GameState = GameState.Ready;

    @property(PipeSpawner)
    pipeSpawner:PipeSpawner = null;

    onLoad() {
        GameManager._inst = this;
    }
 
    start() {
        this.transitionToReady();
    }

    transitionToReady() {
        this.gameState = GameState.Ready;
        this.bird.disableControl();
        this.moveBg.disableMove();
        this.moveLand.disableMove();
        this.pipeSpawner.pause();
    }

    transitionToPlaying() {
        this.gameState = GameState.Playing;
        this.bird.enableControl();
        this.moveBg.enableMove();
        this.moveLand.enableMove();
    }

    transitionToGameOver() {
        this.gameState = GameState.GameOver;
        this.bird.disableControl();
        this.moveBg.disableMove();
        this.moveLand.disableMove();
    }
}

