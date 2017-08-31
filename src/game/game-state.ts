import { PlayerScore } from './api/api';
import { RegularIndiacaScore } from './api/api-impl';
import { ScoreEventListener } from './api/api';



export class GameState extends Phaser.State implements ScoreEventListener {
    playerRightScoreDisplay: Phaser.Text;
    playerLeftScoreDisplay: Phaser.Text;

    playerHasnewScore(score: PlayerScore): void {
        

        let playerId = score.getPlayerId();

        if(playerId == 'playerLeft') {
            this.playerLeftScoreDisplay.setText(score.getPoints().toString());
        } else {
            this.playerRightScoreDisplay.setText(score.getPoints().toString());
        }

        // implement pause as http://phaser.io/examples/v2/misc/pause-menu
    }

    cursorPlayerRight: Phaser.CursorKeys;
    rightButton: Phaser.Key;
    leftButton: Phaser.Key;
    downButton: Phaser.Key;
    upButton: Phaser.Key;

    platforms: Phaser.Group;
    players: Phaser.Group;
    net: Phaser.Sprite;
    indiaca: Phaser.Sprite;
    playerLeft: Phaser.Sprite;
    playerLeftScore: PlayerScore;
    playerRight: Phaser.Sprite;
    playerRightScore: PlayerScore;
    indiacaDirection: number;

    groundLeft: any;
    groundRight: any;


    preload() {
        this.game.load.spritesheet('indiaca', '../assets/IndiacaBall.png', 32, 32);
        this.game.load.image('sky', '../assets/sky.png');
        this.game.load.image('groundLeft', '../assets/groundLeft.png');
        this.game.load.image('groundRight', '../assets/groundRight.png');
        this.game.load.spritesheet('playerLeft','../assets/PlayerLeft.png',128,128);
        this.game.load.spritesheet('dude', '../assets/dude.png', 32, 48);
        this.game.load.image('net', '../assets/Stick.png');
    }

    create() {



        let CENTER_X = this.game.world.width / 2;

        this.game.add.sprite(0, 0, 'sky');
        //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.game.add.group();
        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        // Here we create the ground.
        this.groundLeft = this.platforms.create(0, this.game.world.height - 64, 'groundLeft');
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.groundLeft.scale.setTo(1, 2);
        //  This stops it from falling away when you jump on it
        this.groundLeft.body.immovable = true;

        // Here we create the ground.
        this.groundRight = this.platforms.create(CENTER_X, this.game.world.height - 64, 'groundRight');
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.groundRight.scale.setTo(1, 2);
        //  This stops it from falling away when you jump on it
        this.groundRight.body.immovable = true;

        // The net 
        this.net = this.game.add.sprite(CENTER_X - 8, this.game.world.height - 180, 'net');
        this.game.physics.arcade.enable(this.net);
        this.net.scale.setTo(1, 1.2);
        this.net.body.immovable = true;
        this.net.body.bounce = 0.1;

        // The indiaca
        this.indiaca = this.game.add.sprite(0, 0, 'indiaca');
        this.game.physics.arcade.enable(this.indiaca);
        this.indiaca.body.bounce.y = 0.9;
        this.indiaca.body.bounce.x = 0.9;
        this.indiaca.body.gravity.set(10, 300);
        this.indiaca.body.collideWorldBounds = true;

        this.indiaca.animations.add('up', [0, 3, 2], 10, false);
        this.indiaca.animations.add('down', [2, 1, 0], 10, false);

        //The group for both players;
        this.players = this.game.add.group();
        this.players.enableBody = true;

        // The left player
        this.playerLeftScore = new RegularIndiacaScore(this, 'playerLeft');
        this.playerLeftScoreDisplay = this.game.add.text(10, 10, "Player Left: " + this.playerLeftScore.getPoints(),{ fontSize: 12, fill: '#000' });
        this.playerLeft = this.players.create(32, this.game.world.height - 150, 'playerLeft');
        this.playerLeft.body.bounce.y = 0;
        this.playerLeft.body.gravity.y = 300;
        this.playerLeft.body.collideWorldBounds = true;
        this.playerLeft.animations.add('left', [0, 1, 2], 10, true);
        this.playerLeft.animations.add('right', [0, 2, 1], 10, true);
        this.playerLeft.scale.setTo(0.5,0.5);

        // The right player
        this.playerRightScore = new RegularIndiacaScore(this, 'playerRight');
        this.playerRightScoreDisplay = this.game.add.text(this.game.width - 100, 10, "Player Right: " + this.playerLeftScore.getPoints(),{ fontSize: 12, fill: '#000' });
        this.playerRight = this.players.create(this.game.world.width - 10, this.game.world.height - 150, 'dude');
        this.playerRight.body.bounce.y = 0;
        this.playerRight.body.gravity.y = 300;
        this.playerRight.body.collideWorldBounds = true;
        this.playerRight.animations.add('left', [0, 1, 2, 3], 10, true);
        this.playerRight.animations.add('right', [5, 6, 7, 8], 10, true);

        this.cursorPlayerRight = this.game.input.keyboard.createCursorKeys();

        this.upButton = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.downButton = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.leftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

    }

    update() {

        //  Collision handling (order is important!)
        var indiacaHitNet = this.game.physics.arcade.collide(this.indiaca, this.net);

        var indiacaHitPlayerLeft = this.game.physics.arcade.collide(this.indiaca, this.playerLeft);
        var indiacaHitPlayerRight = this.game.physics.arcade.collide(this.indiaca, this.playerRight);

        var indiacaHitGroundPlayerLeft = this.game.physics.arcade.collide(this.indiaca, this.groundLeft);
        var indiacaHitGroundPlayerRight = this.game.physics.arcade.collide(this.indiaca, this.groundRight);

        var playerLeftHitPlatform = this.game.physics.arcade.collide(this.playerLeft, this.platforms);
        var playerRightHitPlatform = this.game.physics.arcade.collide(this.playerRight, this.platforms);
        

        let facing = this.indiaca.body.facing;
        //console.log("facing: " + facing + ": velocity: " + indiaca.body.velocity.y);

        if (this.indiacaDirection != facing) {
            if (facing = 3) {
                this.indiaca.animations.play('up');
            }
            if (facing = 4) {
                this.indiaca.animations.play('down');
            }
        }

        this.indiacaDirection = facing;


        //  Reset the players velocity (movement)
        this.playerLeft.body.velocity.x = 0;
        this.playerRight.body.velocity.x = 0;

        if (this.cursorPlayerRight.left.isDown) {
            //  Move to the left
            this.playerRight.body.velocity.x = -150;

            this.playerRight.animations.play('left');
        }
        else if (this.cursorPlayerRight.right.isDown) {
            //  Move to the right
            this.playerRight.body.velocity.x = 150;

            this.playerRight.animations.play('right');
        }
        else {
            //  Stand still
            this.playerRight.animations.stop();
            this.playerRight.frame = 4;
        }
        //  Allow the player to jump if they are touching the ground.
        if (this.cursorPlayerRight.up.isDown && this.playerRight.body.touching.down && playerRightHitPlatform) {
            this.playerRight.body.velocity.y = -300;
        }

        if (this.leftButton.isDown) {
            //  Move to the left
            this.playerLeft.body.velocity.x = -150;

            this.playerLeft.animations.play('left');
        }
        else if (this.rightButton.isDown) {
            //  Move to the right
            this.playerLeft.body.velocity.x = 150;

            this.playerLeft.animations.play('right');
        }
        else {
            //  Stand still
            this.playerLeft.animations.stop();
            this.playerLeft.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.upButton.isDown && this.playerLeft.body.touching.down && playerLeftHitPlatform) {
            this.playerLeft.body.velocity.y = -300;
        }

        if (indiacaHitGroundPlayerLeft || indiacaHitGroundPlayerRight) {
            this.indiaca.body.velocity.y = 0;
            this.indiaca.body.velocity.x = 0;
        }

        if (indiacaHitPlayerLeft) {
            this.indiaca.body.velocity.y = -350;
            this.playerRightScore.indiacaTouchedByOpponent();
        }

        if (indiacaHitPlayerRight) {
            this.indiaca.body.velocity.y = -350;
            this.playerLeftScore.indiacaTouchedByOpponent();
        }

        if(indiacaHitGroundPlayerLeft) {
            console.log('GRound left');
            this.playerRightScore.indiacaHitGroundOfOpponent();
        }
        if(indiacaHitGroundPlayerRight) {
            console.log('GRound right');
            this.playerLeftScore.indiacaHitGroundOfOpponent();
        }


    }

    render() {

        //debug helper
       // this.game.debug.spriteInfo(this.indiaca, 32, 48);

    }

}
