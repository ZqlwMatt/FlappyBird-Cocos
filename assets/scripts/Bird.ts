import { _decorator, Animation, Collider, Collider2D, Component, Contact2DType, EventTouch, input, Input, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    private rgd2D: RigidBody2D = null;

    @property
    rotateSpeed: number = 10;

    private _canControl: boolean = false;

    onLoad() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        // 碰撞回调
        let collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        this.rgd2D = this.node.getComponent(RigidBody2D);
    }
    
    start() {
        // this.rgd2D = this.node.getComponent(RigidBody2D);
    }

    update(deltaTime: number) {
        if (this._canControl) {
            this.node.angle -= this.rotateSpeed * deltaTime;
            if (this.node.angle < -60) {
                this.node.angle = -60;
            }
        }
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    public enableControl() {
        this._canControl = true;
        this.rgd2D.enabled = true;
        this.getComponent(Animation).enabled = true;
    }

    public disableControl() {
        this._canControl = false;
        this.rgd2D.enabled = false;
        this.getComponent(Animation).enabled = false;
    }

    onTouchStart(event: EventTouch) {
        if (this._canControl) {
            this.rgd2D.linearVelocity = new Vec2(0, 10); // 向上运动
            // this.node.setRotationFromEuler(new Vec3(0, 0, 30)); // 向上旋转
            this.node.angle = 30;
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        console.log(otherCollider.tag);
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D) {

    }
}

