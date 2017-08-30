    export interface FoulEventListener {
        indiacaHitGroundOfOpponent(): void;
        indiacaTouchedByOpponent(): void;
    }

    /**
     * FoulHandler should be attached to a player and 
     * 
     * @export
     * @interface FoulHandler
     * @extends {FoulEventListener}
     */
    export interface FoulHandler extends FoulEventListener {
        
    }

    export interface ScoreEvent {
        score(): PlayerScore;
    }

    /**
     * Listener that gets informed about score changes
     * 
     * @export
     * @interface ScoreEventListener
     */
    export interface ScoreEventListener {
        playerHasnewScore(score: PlayerScore): void;
    }

    /**
     * Score should be attached to a player. Every time a PlayEvent happens Score updates its points
     * and fires a ScoreEvent to every ScoreEventListener
     * 
     * @export
     * @interface PlayerScore
     * @extends {PlayEvent}
     */
    export interface PlayerScore extends FoulEventListener{
        getPlayerId(): string;
        getPoints(): number;
        addScoreEventListener(l: ScoreEventListener): void;
    }
