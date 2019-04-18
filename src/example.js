// var config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,

//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 300 },
//             debug: false
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };

// var game = new Phaser.Game(config);

// function preload() {
//     this.load.image('sky', 'assets/phaser3-tutorial-src/assets/sky.png');
//     this.load.image('ground', 'assets/phaser3-tutorial-src/assets/platform.png');
//     this.load.image('star', 'assets/phaser3-tutorial-src/assets/star.png');
//     this.load.image('bomb', 'assets/phaser3-tutorial-src/assets/bomb.png');
//     this.load.spritesheet('dude', 'assets/phaser3-tutorial-src/assets/dude.png',
//         { frameWidth: 32, frameHeight: 48 }
//     );
// }

// function create() {
//     this.add.image(400, 300, 'sky');
//     this.add.image(400, 300, 'star');

//     platforms = this.physics.add.staticGroup();  ///static body has no physics

//     platforms.create(400, 568, 'ground').setScale(2).refreshBody();

//     platforms.create(600, 400, 'ground'); //posititioned relative to centre
//     platforms.create(50, 250, 'ground');
//     platforms.create(750, 220, 'ground');


//     player = this.physics.add.sprite(100, 450, 'dude');

//     player.setBounce(0.2);
//     player.setCollideWorldBounds(true);

//     this.physics.add.collider(player, platforms);


//     this.anims.create({
//         key: 'left',
//         frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), /// start and end referes to animation frames
//         frameRate: 10,
//         repeat: -1
//     });

//     this.anims.create({
//         key: 'turn',
//         frames: [{ key: 'dude', frame: 4 }],
//         frameRate: 20
//     });

//     this.anims.create({
//         key: 'right',
//         frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
//         frameRate: 10,
//         repeat: -1
//     });

//     cursors = this.input.keyboard.createCursorKeys();

// }

// function update() {
//     if (cursors.left.isDown) {
//         player.setVelocityX(-160);

//         player.anims.play('left', true);
//     }
//     else if (cursors.right.isDown) {
//         player.setVelocityX(160);

//         player.anims.play('right', true);
//     }
//     else {
//         player.setVelocityX(0);

//         player.anims.play('turn');
//     }

//     if (cursors.up.isDown && player.body.touching.down) {
//         player.setVelocityY(-330);
//     }
// }


// import Phaser from 'phaser';
// import LoadScene from "scenes/LoadScene.js";
// import MenuScene from "scenes/MenuScene.js";
// var config = {
//     type: Phaser.AUTO,
//     width: 3200,
//     height: 3200,
//     scale: {
//         mode: Phaser.Scale.FIT,
//         autoCenter: Phaser.Scale.CENTER_BOTH
//     },
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 0 },
//         }

//     },
//     scene: {

//         preload: preload,
//         create: create,
//         update: update
//     }
// }


// var game = new Phaser.Game(config);
// game.scene.add('LoadScene', LoadScene)
// game.scene.add('MenuScene', MenuScene)

// function preload() {
//     this.load.image(
//         "mapTiles",
//         "assets/tileset.png",
//         "assets/plantRepack.png"
//     );
//     this.load.tilemapTiledJSON("map", "assets/32x32map.json");
//     this.load.spritesheet('character', 'assets/character.png',
//         { frameWidth: 30, frameHeight: 30 }
//     );
// }

// function create() {
//     const map = this.make.tilemap({ key: "map" })
//     const tileset = map.addTilesetImage("tileset", "mapTiles")
//     const plantTileSet = map.addTilesetImage("plantRepack", 'mapTiles')

//     const bottomLayer = map.createStaticLayer("Tile Layer 1", plantTileSet, 0, 0)
//     const topLayer = map.createStaticLayer("walls", tileset, 0, 0)

//     player = this.physics.add.sprite(200, 160, 'character');

//     player.setScale(0.85)

//     topLayer.setCollisionByProperty({ collision: true })

//     player.setCollideWorldBounds(true);

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // topLayer.renderDebug(debugGraphics, {
    //     tileColor: null, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });


//     this.physics.add.collider(player, topLayer)

//     this.anims.create({
//         key: 'up',
//         frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }), /// start and end referes to animation frames
//         frameRate: 7,
//         repeat: -1
//     });
//     this.anims.create({
//         key: 'stop up',
//         frames: [{ key: 'character', frame: 0 }],
//         frameRate: 5,
//     });

//     this.anims.create({
//         key: 'down',
//         frames: this.anims.generateFrameNumbers('character', { start: 4, end: 7 }), /// start and end referes to animation frames
//         frameRate: 7,
//         repeat: -1
//     });
//     this.anims.create({
//         key: 'stop down',
//         frames: [{ key: 'character', frame: 4 }],
//         frameRate: 5,
//     });

//     this.anims.create({
//         key: 'left',
//         frames: this.anims.generateFrameNumbers('character', { start: 8, end: 11 }), /// start and end referes to animation frames
//         frameRate: 7,
//         repeat: -1
//     });
//     this.anims.create({
//         key: 'stop left',
//         frames: [{ key: 'character', frame: 8 }],
//         frameRate: 7,
//     });

//     this.anims.create({
//         key: 'right',
//         frames: this.anims.generateFrameNumbers('character', { start: 12, end: 15 }), /// start and end referes to animation frames
//         frameRate: 5,
//         repeat: -1
//     });
//     this.anims.create({
//         key: 'stop right',
//         frames: [{ key: 'character', frame: 12 }],
//         frameRate: 5,
//     });

//     cursors = this.input.keyboard.createCursorKeys();

//     this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
//     this.cameras.main.setZoom(5)
//     this.cameras.main.startFollow(player)

// }

// let dir = ""
// function update(time, delta) {
//     player.body.setVelocity(0);


//     // Horizontal movement
//     if (cursors.left.isDown) {
//         dir = "left"
//         player.body.setVelocityX(-150);
//         player.anims.play('left', true)
//     } else if (cursors.right.isDown) {
//         dir = "right"
//         player.body.setVelocityX(150);
//         player.anims.play('right', true)
//     }
//     // Vertical movement
//     else if (cursors.up.isDown) {
//         dir = "up"
//         player.body.setVelocityY(-150);
//         player.anims.play('up', true)
//     } else if (cursors.down.isDown) {
//         dir = "down"
//         player.body.setVelocityY(150);
//         player.anims.play('down', true)
//     } else {
//         player.setVelocity(0);
//         switch (dir) {
//             case "left":
//                 player.anims.play("stop left", true)
//                 break;

//             case "right":
//                 player.anims.play("stop right", true)
//                 break

//             case "up":
//                 player.anims.play("stop up", true)
//                 break

//             case "down":
//                 player.anims.play("stop down", true)
//                 break

//             default:
//                 break;
//         }
//     }
// }
