const formDiv = document.getElementById("form-div");
const form = document.getElementById('player-form')
document.addEventListener('click', function(event){
    if (event.target.id == "submit-button")
    {
        event.preventDefault()
        form.remove(form)
        
        startGame()
    }
})

let a = null
class TestScene extends Phaser.Scene{
    constructor ()
    {
        super({key: 'TestScene'})
    }
    preload()
    {
        this.load.image("keychainmenu", "assets/keychainmenu.png");
        this.load.image('start_button', 'assets/character.png')
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
        this.load.image(
            "mapTiles",
            "assets/tileset.png",
            "assets/plantRepack.png"
        );
        this.load.tilemapTiledJSON("map", "assets/32x32map.json");
        this.load.image("keyhole", "assets/keyhole.png");
        this.load.image("key", "assets/key.png");
        this.load.spritesheet('character', 'assets/character.png',
            { frameWidth: 30, frameHeight: 30 }
        );
    }



    create() {
        
        const map = this.make.tilemap({ key: "map" })
        const tileset = map.addTilesetImage("tileset", "mapTiles")
        const plantTileSet = map.addTilesetImage("plantRepack", 'mapTiles')

        const bottomLayer = map.createStaticLayer("Tile Layer 1", plantTileSet, 0, 0)
        const topLayer = map.createStaticLayer("walls", tileset, 0, 0)

        window.player = this.physics.add.sprite(200, 160, 'character');
        player.setScale(0.85)

        topLayer.setCollisionByProperty({ collision: true })

        player.setCollideWorldBounds(true);

        // const debugGraphics = this.add.graphics().setAlpha(0.75);
        // topLayer.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });


        this.physics.add.collider(player, topLayer)

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
        this.cameras.main.setZoom(5)
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


