import { _decorator, AudioClip, Component, Label, Node } from 'cc';
import { Bird } from './Bird';
import { MoveBg } from './MoveBg';
import { PipeSpawner } from './PipeSpawner';
import { GameReadyUI } from './UI/GameReadyUI';
import { GameData } from './GameData';
import { GameOverUI } from './UI/GameOverUI';
import { AudioMgr } from './AudioMgr';
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
    @property(GameReadyUI)
    gameReadyUI: GameReadyUI = null;
    @property(Node)
    gamingUI: Node = null;
    @property(GameOverUI)
    gameOverUI: GameOverUI = null;
    @property(Label)
    scoreLabel: Label = null;

    gameState: GameState = GameState.Ready;

    @property(PipeSpawner)
    pipeSpawner:PipeSpawner = null;

    @property(AudioClip)
    bgAudio: AudioClip = null;
    @property(AudioClip)
    gameOverAudio: AudioClip = null;

    onLoad() {
        GameManager._inst = this;
    }
 
    start() {
        this.transitionToReady();
        AudioMgr.inst.play(this.bgAudio, 0.5);
    }

    transitionToReady() {
        this.gameState = GameState.Ready;
        this.bird.disableControl();
        this.moveBg.disableMove();
        this.moveLand.disableMove();
        this.pipeSpawner.pause();
        this.gameReadyUI.node.active = true;
        this.gamingUI.active = false;
        this.gameOverUI.hide();

        // GameData.clearStorage();
    }

    transitionToPlaying() {
        // 游戏结束状态不能进入游戏开始状态
        if (this.gameState === GameState.GameOver) return;

        this.gameState = GameState.Playing;
        this.bird.enableControl();
        this.moveBg.enableMove();
        this.moveLand.enableMove();
        this.pipeSpawner.resume();
        this.gameReadyUI.node.active = false;
        this.gamingUI.active = true;
    }

    transitionToGameOver() {
        if (this.gameState === GameState.GameOver) return;

        this.gameState = GameState.GameOver;
        this.bird.disableControlNotRGD();
        this.moveBg.disableMove();
        this.moveLand.disableMove();
        this.pipeSpawner.pause();
        this.gamingUI.active = false;

        this.gameOverUI.show(GameData.get_score(), GameData.get_bestScore());
        GameData.saveScore();
        AudioMgr.inst.stop();
        AudioMgr.inst.playOneShot(this.gameOverAudio, 0.5);
    }

    // score

    addScore(value: number = 1) {
        GameData.add_score(value);
        this.scoreLabel.string = GameData.get_score().toString();
    }
}

