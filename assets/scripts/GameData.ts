import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export class GameData {
    private static _score: number = 0;

    public static get_score(): number {
        return this._score;
    }

    public static set_score(value: number) {
        this._score = value;
    }

    public static add_score(value: number) {
        this._score += value;
    }

}

