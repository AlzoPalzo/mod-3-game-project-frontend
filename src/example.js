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
