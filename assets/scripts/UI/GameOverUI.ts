import { _decorator, Component, director, Label, Node, Sprite } from 'cc';
import { GameData } from '../GameData';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {

    // @property(Node)
    // gameOverNode: Node = null;

    @property(Label)
    curScoreLabel: Label = null;
    @property(Label)
    bestScoreLabel: Label = null;
    @property(Sprite)
    newSprite: Sprite = null;
    @property([Node])
    medalArray: Node[] = [];
    
    public show(curScore: number, bestScore: number) {
        this.node.active = true;
        this.curScoreLabel.string = curScore.toString();
        this.bestScoreLabel.string = bestScore.toString();

        if (curScore > bestScore) {
            this.newSprite.node.active = true;
        } else {
            this.newSprite.node.active = false;
        }

        // 0-9
        let index = Math.floor(curScore / 5);
        if (index > 3) index = 3;
        this.medalArray[index].active = true;
    }

    public hide() {
        this.node.active = false;
    }

    onPlayButtonClick() {
        director.loadScene(director.getScene().name);
        GameData.reset();
    }
}

