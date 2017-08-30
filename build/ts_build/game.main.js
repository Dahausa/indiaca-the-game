/// <reference path="../typings/phaser.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GameState } from './game/game-state';
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this, 800, 600, Phaser.AUTO, 'content', null) || this;
        //this.state.add('Boot', BootState);
        //this.state.add('Preloader', PreloaderState);
        _this.state.add('GameState', GameState);
        _this.state.start('GameState');
        return _this;
    }
    return App;
}(Phaser.Game));
export { App };
// when the page has finished loading, create our game
window.onload = function () {
    var game = new App();
};
//# sourceMappingURL=game.main.js.map