import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export class GameData {
    private static readonly BESTSCORE_KEY: string = 'bestScore';
    private static _score: number = 0;
    private static _bestScore: number = 0;

    public static get_score(): number {
        return this._score;
    }

    public static set_score(value: number) {
        this._score = value;
    }

    public static add_score(value: number) {
        this._score += value;
    }

    public static get_bestScore(): number {
        return parseInt(localStorage.getItem(this.BESTSCORE_KEY) || '0');
    }

    public static saveScore() {
        let bestScore = Math.max(this._score, this.get_bestScore());
        localStorage.setItem(this.BESTSCORE_KEY, bestScore.toString());
    }

    public static clearStorage() {
        localStorage.clear();
    }

    public static reset() {
        this._score = 0;
    }
}

