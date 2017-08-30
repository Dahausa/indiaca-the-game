import { PlayerScore } from './api';
import { ScoreEventListener, ScoreEvent } from './api';


export class RegularIndiacaScore implements PlayerScore {
    


    private static MAX_HITS: number = 3;
    private actualHits: number = 0;

    private playerId: string;
    private points: number = 0;
    private listeners: ScoreEventListener[] = new Array();

    constructor(listener: ScoreEventListener,playerId: string) {
        this.listeners.push(listener);
        this.playerId = playerId;
    }

    getPlayerId(): string {
        throw new Error("Method not implemented.");
    }

    getPoints(): number {
        return this.points;
    }

    addScoreEventListener(l: ScoreEventListener): void {
        this.listeners.push(l);
    }

    indiacaHitGroundOfOpponent(): void {
        this.addPoint();
    }

    indiacaTouchedByOpponent(): void {
        this.actualHits = this.actualHits + 1;
        if (this.actualHits == RegularIndiacaScore.MAX_HITS) {
            this.addPoint();
        }
    }

    private addPoint() {
        this.points = this.points + 1;
        this.listeners.forEach(element => {
            element.playerHasnewScore(this);
        });
    }

}