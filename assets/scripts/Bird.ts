import { _decorator, Animation, AudioClip, Collider, Collider2D, Component, Contact2DType, EventTouch, input, Input, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import { Tags } from './Tags';
import { GameManager } from './GameManager';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    private rgd2D: RigidBody2D = null;

    @property
    rotateSpeed: number = 10;

    private _canControl: boolean = false;

    @property(AudioClip)
    clickAudio: AudioClip = null;

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
        let collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    public enableControl() {
        this._canControl = true;
        this.rgd2D.enabled = true;
        this.getComponent(Animation).enabled = true;
    }

    // 游戏开始调用这个
    public disableControl() {
        this._canControl = false;
        // ! bug
        // 不能禁用 RigidBody2D 组件，否则无法触发碰撞事件，但是该函数由撞事件调用
        this.rgd2D.enabled = false;
        this.getComponent(Animation).enabled = false;
    }
    
    // 游戏结束调用这个
    public disableControlNotRGD() {
        this._canControl = false;
        this.getComponent(Animation).enabled = false;
    }

    onTouchStart(event: EventTouch) {
        if (this._canControl) {
            // console.log(this._canControl);
            this.rgd2D.linearVelocity = new Vec2(0, 10); // 向上运动
            // this.node.setRotationFromEuler(new Vec3(0, 0, 30)); // 向上旋转
            this.node.angle = 30;
            AudioMgr.inst.playOneShot(this.clickAudio, 0.5);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        console.log(otherCollider.tag);

        if (otherCollider.tag === Tags.LAND || otherCollider.tag === Tags.PIPE) {
            GameManager.inst().transitionToGameOver();
        }
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        if (otherCollider.tag === Tags.PIPE_MIDDLE) {
            GameManager.inst().addScore();
        }
    }
}

