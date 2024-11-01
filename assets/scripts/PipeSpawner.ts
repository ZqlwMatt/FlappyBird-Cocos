import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipeSpawner')
export class PipeSpawner extends Component {

    @property(Prefab)
    pipePrefab: Prefab = null;
    @property
    spawnRate: number = 0.5;

    private timer: number = 0;

    start() {

    }

    update(deltaTime: number) {
        this.timer += deltaTime;
        if (this.timer >= this.spawnRate) {
            this.timer = 0;
            this.spawnPipe();
        }
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
}

