var RegularIndiacaScore = (function () {
    function RegularIndiacaScore(listener, playerId) {
        this.actualHits = 0;
        this.points = 0;
        this.listeners = new Array();
        this.listeners.push(listener);
        this.playerId = playerId;
    }
    RegularIndiacaScore.prototype.getPlayerId = function () {
        throw new Error("Method not implemented.");
    };
    RegularIndiacaScore.prototype.getPoints = function () {
        return this.points;
    };
    RegularIndiacaScore.prototype.addScoreEventListener = function (l) {
        this.listeners.push(l);
    };
    RegularIndiacaScore.prototype.indiacaHitGroundOfOpponent = function () {
        this.addPoint();
    };
    RegularIndiacaScore.prototype.indiacaTouchedByOpponent = function () {
        this.actualHits = this.actualHits + 1;
        if (this.actualHits == RegularIndiacaScore.MAX_HITS) {
            this.addPoint();
        }
    };
    RegularIndiacaScore.prototype.addPoint = function () {
        var _this = this;
        this.points = this.points + 1;
        this.listeners.forEach(function (element) {
            element.playerHasnewScore(_this);
        });
    };
    RegularIndiacaScore.MAX_HITS = 3;
    return RegularIndiacaScore;
}());
export { RegularIndiacaScore };
//# sourceMappingURL=api-impl.js.map