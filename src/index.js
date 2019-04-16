var config = {
    type: Phaser.AUTO,
    width: 320,
    height: 320,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        }

    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}


var game = new Phaser.Game(config);

function preload ()
{
    this.load.image("mapTiles", "assets/scr1.PNG")
    this.load.tilemapTiledJSON("map", "assets/tileMap.json")
    this.load.spritesheet('character', 'assets/character.png',
        { frameWidth: 30, frameHeight: 30 }
    );
}

function create ()
{
    const map = this.make.tilemap({key: "map"})
    const tileset = map.addTilesetImage("scr1", "mapTiles")

    const bottomLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0)
    const topLayer = map.createStaticLayer("Top layer", tileset, 0, 0)

    player = this.physics.add.sprite(140, 160, 'character');

    player.setScale(0.85)

    topLayer.setCollisionByProperty({collides: true})

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
        frames: [{key: 'character', frame: 0}],
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

    cursors = this.input.keyboard.createCursorKeys();
    
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setZoom(1.2)
    this.cameras.main.startFollow(player)
    
}

let dir = ""
function update (time, delta)
{
    player.body.setVelocity(0);


    // Horizontal movement
    if (cursors.left.isDown) {
        dir = "left"
        player.body.setVelocityX(-100);
        player.anims.play('left', true)
    } else if (cursors.right.isDown) {
        dir = "right"
        player.body.setVelocityX(100);
        player.anims.play('right', true)
    }
    // Vertical movement
    else if (cursors.up.isDown) {
        dir = "up"
        player.body.setVelocityY(-100);
        player.anims.play('up', true)
    } else if (cursors.down.isDown) {
        dir = "down"
        player.body.setVelocityY(100);
        player.anims.play('down', true)
    } else
    {
        player.setVelocity(0);
        switch (dir) {
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

// class MainMenu extends Phaser.scene
// {
//     constructor
// }