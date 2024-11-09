import { _decorator, Component, Label, Node, Sprite } from 'cc';
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
    
    public show(curScore: number, bestScore: number) {
        this.node.active = true;
        this.curScoreLabel.string = curScore.toString();
        this.bestScoreLabel.string = bestScore.toString();

        if (curScore > bestScore) {
            this.newSprite.node.active = true;
        } else {
            this.newSprite.node.active = false;
        }
    }

    public hide() {
        this.node.active = false;
    }
}
