import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
import { Pipe } from './Pipe';
const { ccclass, property } = _decorator;

@ccclass('PipeSpawner')
export class PipeSpawner extends Component {

    @property(Prefab)
    pipePrefab: Prefab = null;
    @property
    spawnRate: number = 0.5;

    private timer: number = 0;
    private _isSpawning: boolean = false;

    update(deltaTime: number) {
        if (!this._isSpawning) return;

        this.timer += deltaTime;
        if (this.timer >= this.spawnRate) {
            this.timer = 0;
            this.spawnPipe();
            // this.destroyPipe();
        }

    }

    public setSpawnRate(value: number) {
        this.spawnRate = value;
    }

    public getSpawnRate(): number {
        return this.spawnRate;
    }

    spawnPipe() {
        const pipeInst = instantiate(this.pipePrefab);
        this.node.addChild(pipeInst);
        const p = this.node.getWorldPosition();
        pipeInst.setWorldPosition(p);

        const p_local = pipeInst.getPosition();
        const y_offset = math.randomRangeInt(-300, 300);
        pipeInst.setPosition(p_local.x, y_offset);
    }

    // destroyPipe() {
    //     this.node.children.forEach(child => {
    //         if (child.getWorldPosition().x < -400) {
    //             child.destroy();
    //         }
    //     });
    // }

    public pause() {
        this._isSpawning = false;

        const nodeArray = this.node.children;
        for (let i = 0; i < nodeArray.length; i++) {
            const pipe = nodeArray[i].getComponent(Pipe);
            if (pipe) {
                pipe.enabled = false;
            }
        }
    }

    public resume() {
        this._isSpawning = true;
    }
}

