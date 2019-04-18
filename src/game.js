const formDiv = document.getElementById("form-div");
const form = document.getElementById('player-form')

doorCoors = [
  { x: 3, y: 7 },
  { x: 10, y: 7 },
  { x: 14, y: 3 },
  { x: 19, y: 6 },
  { x: 25, y: 3 },
  { x: 28, y: 14 },
  { x: 38, y: 10 },
  { x: 37, y: 14 },
  { x: 44, y: 6 },
  { x: 44, y: 11 },
  { x: 50, y: 3 },
  { x: 60, y: 4 },
  { x: 66, y: 3 },
  { x: 17, y: 14 },
  { x: 50, y: 10 },
  { x: 60, y: 13 },
  { x: 66, y: 12 },

  { x: 18, y: 22 },
  { x: 50, y: 24 },
  { x: 66, y: 21 },
  { x: 11, y: 25 },
  { x: 14, y: 30 },
  { x: 20, y: 30 },
  { x: 28, y: 30 },
  { x: 50, y: 28 },

  { x: 54, y: 25 },
  { x: 50, y: 32 },
  { x: 63, y: 31 },
  { x: 68, y: 26 },
  { x: 6, y: 41 },
  { x: 12, y: 39 },
  { x: 22, y: 37 },
  { x: 18, y: 45 },

  { x: 23, y: 34 },
  { x: 28, y: 45 },
  { x: 38, y: 40 },
  { x: 43, y: 32 },
  { x: 53, y: 40 },
  { x: 63, y: 42 },
  { x: 67, y: 45 },
  { x: 75, y: 40 },
  { x: 68, y: 35 },
];

keyCoors = [
    { x: 10,y: 3},
    { x: 20,y: 1},
    { x: 41,y: 10},
    { x: 56,y: 5},
    { x: 38,y: 3},
    { x: 73,y: 5},
    { x: 21,y: 11},
    { x: 19,y: 16},
    { x: 29,y: 20},
    { x: 63,y: 8},
    { x: 75,y: 16},
    { x: 6,y: 19},
    { x: 57,y: 24},
    { x: 5,y: 22},
    { x: 31,y: 29},
    { x: 60,y: 28},
    { x: 66,y: 30},
    { x: 76,y: 28},
    { x: 6,y: 32},
    { x: 15,y: 36},
    { x: 21,y: 32},
    { x: 30,y: 36},
    { x: 35,y: 35},
    { x: 47,y: 32},
    { x: 73,y: 37},
    { x: 6,y: 46},
    { x: 21,y: 42},
    { x: 54,y: 37},
    { x: 35,y: 41}];

document.addEventListener('click', function(event){
    if (event.target.id == "submit-button")
    {
        event.preventDefault()
        form.remove(form)

        startGame()
    }
})

let a = null
let b = null
class TestScene extends Phaser.Scene{
    constructor ()
    {
        super({key: 'TestScene'})
    }
    preload()
    {
        this.load.image("keychainmenu", "assets/keychainmenu.png");
        this.load.image('start_button', 'assets/startButton.png')
    }
    create()
    {
        this.add.image(1280, 800, 'keychainmenu')
        this.startbutton = this.add.image(1000, 1000, 'start_button').setInteractive()

        a = this
        this.startbutton.on('pointerover', function(event){

            a.scene.start('GameScene')
        })

    }

    update(time, delta)
    {

    }

}

function collectKey(player,  key){
    key.disableBody(true, true)
    player.hasKey = true
}

function unlockDoor(player, keyHole) {
    if (player.hasKey == true)
    {
        keyHole.disableBody(true, true)
        player.hasKey = false
    }
}

class GameScene extends Phaser.Scene{
    constructor()
    {
        super({key: 'GameScene',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                }

            },
         })
    }

    preload() {
        this.load.image("mapTiles", "assets/newTileSet.png");
        this.load.tilemapTiledJSON("map", "assets/80x50map.json");
        this.load.image("keyhole", "assets/keyhole.png");
        this.load.image("key", "assets/key.png")
        this.load.spritesheet('character', 'assets/character.png',
            { frameWidth: 30, frameHeight: 30 }
        );
    }



    create() {
        b = this

        const map = this.make.tilemap({ key: "map" })
        const tileset = map.addTilesetImage(
          "newTileSet",
          "mapTiles"
        );
        //const plantTileSet = map.addTilesetImage("plantRepack", 'mapTiles')
            // const tileSet = map.addTilesetImage(
            //   "tileset",
            //   "mapTiles"
            // );
            // const topLayer = map.createStaticLayer(
            //   "Tile Layer 1",
            //   tileset,
            //   0,
            //   0
            // );
        // const walls = map.createStaticLayer("walls", tileset, 0, 0);
        const ground = map.createStaticLayer("ground", tileset, 0, 0);
        const path = map.createStaticLayer("path", tileset, 0, 0);
        const walls = map.createStaticLayer("walls", tileset, 0, 0);
        const greenery1 = map.createStaticLayer("greenery 1", tileset, 0, 0);
        const greenery2 = map.createStaticLayer("greenery 2", tileset, 0, 0);

        // window.keyHole = this.physics.add
        //   .sprite(112, 240, "keyhole")
        //   .setImmovable();

        // window.keyHole2 = this.physics.add
        //   .sprite(352, 240, "keyhole")
        //   .setImmovable();

        // window.keyHole3 = this.physics.add.sprite(464, 112, 'keyhole').setImmovable()

        // window.keyHole4 = this.physics.add
        //   .sprite(624, 208, "keyhole")
        //   .setImmovable();

        // window.keyHole5 = this.physics.add.sprite(816, 112, 'keyhole').setImmovable()
        window.player = this.physics.add.sprite(200, 160, 'character');

        for (let i = 0; i < doorCoors.length; i++) {
            let x = doorCoors[i].x * 32 +16
            let y = doorCoors[i].y * 32 + 16
            window[`keyHole${i}`] = this.physics.add
              .sprite(x, y, "keyhole")
              .setImmovable();


              this.physics.add.collider(player, window[`keyHole${i}`], unlockDoor, null, this)

        }

        for (let i = 0; i < keyCoors.length; i++) {
            let x = keyCoors[i].x * 32 + 16;
            let y = keyCoors[i].y * 32 + 16;

            window[`key${i}`] = this.physics.add.sprite(x, y, 'key')
            this.physics.add.overlap(
                player,
                window[`key${i}`],
                collectKey,
                null,
                this
            );
        }

        // window.key = this.physics.add.sprite(200, 200, 'key')
        // this.physics.add.overlap(player, key, collectKey, null, this)

        // function collectKey(player, key) {
        //     key.disableBody(true, true)
        // }

        player.setScale(0.85)

        walls.setCollisionByProperty({ collision: true })
        greenery1.setCollisionByProperty({collision: true})
        greenery2.setCollisionByProperty({collision: true})
        player.setCollideWorldBounds(true);

        player.hasKey = false

        // const debugGraphics = this.add.graphics().setAlpha(0.75);
        // topLayer.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });


        // this.physics.add.collider(
        //   player,
        //   keyHole2,
        //   unlockDoor,
        //   null,
        //   this
        // );
        // this.physics.add.collider(
        //   player,
        //   keyHole3,
        //   unlockDoor,
        //   null,
        //   this
        // );
        // this.physics.add.collider(
        //   player,
        //   keyHole4,
        //   unlockDoor,
        //   null,
        //   this
        // );
        // this.physics.add.collider(player, keyHole5, unlockDoor, null, this)
        this.physics.add.collider(player, walls)
        this.physics.add.collider(player, greenery1)
        this.physics.add.collider(player, greenery2)

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }), /// start and end referes to animation frames
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'stop up',
            frames: [{ key: 'character', frame: 0 }],
            frameRate: 5,
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('character', { start: 4, end: 7 }), /// start and end referes to animation frames
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'stop down',
            frames: [{ key: 'character', frame: 4 }],
            frameRate: 5,
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('character', { start: 8, end: 11 }), /// start and end referes to animation frames
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'stop left',
            frames: [{ key: 'character', frame: 8 }],
            frameRate: 7,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('character', { start: 12, end: 15 }), /// start and end referes to animation frames
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'stop right',
            frames: [{ key: 'character', frame: 12 }],
            frameRate: 5,
        });

        window.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setZoom(7)
        this.cameras.main.startFollow(player)

    }

static dir = ""



update(time, delta)
{
    player.body.setVelocity(0);


    // Horizontal movement
    if (cursors.left.isDown) {
        this.dir = "left"
        player.body.setVelocityX(-150);
        player.anims.play('left', true)
    } else if (cursors.right.isDown) {
        this.dir = "right"
        player.body.setVelocityX(150);
        player.anims.play('right', true)
    }
    // Vertical movement
    else if (cursors.up.isDown) {
        this.dir = "up"
        player.body.setVelocityY(-150);
        player.anims.play('up', true)
    } else if (cursors.down.isDown) {
        this.dir = "down"
        player.body.setVelocityY(150);
        player.anims.play('down', true)
    } else {
        player.setVelocity(0);
        switch (this.dir) {
            case "left":
                player.anims.play("stop left", true)
                break;

            case "right":
                player.anims.play("stop right", true)
                break

            case "up":
                player.anims.play("stop up", true)
                break

            case "down":
                player.anims.play("stop down", true)
                break

            default:
                break;
        }
    }
}




}

var config = {
    type: Phaser.AUTO,
    width: 2560,
    height: 1600,
    scale: {
        mode :Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    scene:
    [ TestScene, GameScene]
}

function startGame ()
{
    var game = new Phaser.Game(config);
}
