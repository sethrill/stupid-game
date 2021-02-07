import { CST } from "../../CST";
import { Bullet } from "../../prefabs/Bullet";
import { Scene } from "phaser";
import { Enemy } from "../../prefabs/Enemy";
import { IConversation } from "../../prefabs/conversation-interface";
import { DialogBox } from "../../prefabs/dialogBox";
export class Level1Scene extends Phaser.Scene {
    background!: Phaser.GameObjects.TileSprite;
    player!: Phaser.Physics.Arcade.Sprite;
    keyboard!: Record<'a' | 'd', Phaser.Input.Keyboard.Key>
    playerBullets!: Phaser.Physics.Arcade.Group;
    enemyBullets!: Phaser.Physics.Arcade.Group;
    bullet?: Bullet;
    enemies: Enemy[] = []
    enemyGroups!: Phaser.Physics.Arcade.Group;
    enemyRows: number = 0;
    playerDead: boolean = false;
    levelEnded: boolean = false;
    yesButton: any;
    noButton: any;
    diedTitle: any
    messageBox: any;
    conversationIndex: number = 0;
    kassandraMonologue: IConversation[] = [
        { dialogue: 'Kassandra: I did it...', outerWindowColor: 0xffff00 },
        { dialogue: 'Kassandra: But more enemies are on their way.', outerWindowColor: 0xffff00 },
        { dialogue: 'Kassandra: What should I do...?', outerWindowColor: 0xffff00 },
        { dialogue: 'Kassandra: All my weapons are locked. I only have the cannon.', outerWindowColor: 0xffff00 },
        { dialogue: 'Kassandra: I can\'t beat them like this... alone...', outerWindowColor: 0xffff00 },
        { dialogue: 'Kassandra: Should I... turn back?', outerWindowColor: 0xffff00 },
        { dialogue: 'Kassandra: No... NO!!', outerWindowColor: 0xffff00 },
        { dialogue: 'Kassandra: Dammit Kassandra! You\'re not a coward!', outerWindowColor: 0xffff00 },
        { dialogue: 'Kassandra: I have to fight! Otherwise their death is pointless.', outerWindowColor: 0xffff00 },
        { dialogue: 'Kassandra: I have to fight for them... For him...', outerWindowColor: 0xffff00 },
        { dialogue: 'Console: *Beep*, *Beep*.', outerWindowColor: 0x808080 },
        { dialogue: 'Console: Enemies are approaching!', outerWindowColor: 0x808080 },
        { dialogue: 'Kassandra: I\'m ready!', outerWindowColor: 0xffff00 },
    ];
    constructor() {
        super({
            key: CST.SCENES.LEVEL1
        })
    }
    create() {
        this.enemyRows = 0;
        this.playerDead = false;
        this.levelEnded = false;
        this.background = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, "level_bg").setOrigin(0).setDepth(0);
        this.messageBox = new DialogBox(this, 300, 400);
        this.player = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height * 0.90, "ship4");
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.22);
        this.enemyGroups = this.physics.add.group();
        this.playerBullets = this.physics.add.group({ classType: Bullet, maxSize: 50, runChildUpdate: true });
        this.enemyBullets = this.physics.add.group({ classType: Bullet, maxSize: 50, runChildUpdate: true });
        this.createEnemies();
        this.keyboard = this.input.keyboard.addKeys("a, d") as this['keyboard'];
        this.anims.create({
            key: 'enemyGetHit',
            repeat: 1,
            frameRate: 30,
            frames: this.anims.generateFrameNames("greenEnemy", {
                frames: [0, 1, 2, 0]
            })
        });
        this.input.on('pointerdown', () => {
            this.bullet = this.playerBullets.get();
            if (this.bullet && !this.playerDead) {
                this.bullet.setActive(true).setVisible(true);
                let velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2()
                this.physics.velocityFromRotation(this.player.rotation, 400, velocity);
                this.bullet.fire(this.player, { x: velocity.x * 180 / Math.PI, y: velocity.y * 180 / Math.PI });
            }
        }, this);

        this.physics.world.addCollider(this.playerBullets, this.enemyGroups, (bullet, enemy) => {
            this.enemies.find(e => e.sprite === enemy)?.hit();
            bullet.destroy();
        });
        this.physics.world.addCollider(this.enemyBullets, this.player, () => {
            this.playerDead = true;
            this.player.destroy();
            this.enemies.forEach(e => e.stopAttacking());
            this.playerDied();
        });
    }
    update() {
        this.background.tilePositionY -= 0.5;
        if (this.enemyGroups.children.entries.length === 0 && this.enemyRows >= 1) {
            this.player.setCollideWorldBounds(false);
            this.levelEnded = true;
            setTimeout(() => {
                this.enemies.forEach(e => e.stopAttacking());
                //this.scene.start(CST.SCENES.MENU);
                this.startMonologue();
            }, 2000)
        }
        if (!this.playerDead && !this.levelEnded) {
            this.player.setVelocity(0);
            if (this.keyboard.a.isDown) {
                this.player.setVelocityX(-400);
            }
            if (this.keyboard.d.isDown) {
                this.player.setVelocityX(400);
            }
            // let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.x, this.input.y);
            // //rotation cannon
            // this.player.setRotation(angle + Math.PI / 2);
        }
        if (this.enemyGroups.children.entries.length === 0 && this.enemyRows < 3) {
            this.createEnemies();
        }

    }

    startMonologue() {
        this.messageBox.showMessageBox(this.kassandraMonologue[0].dialogue, this.kassandraMonologue[0].outerWindowColor);
        let nextKey = this.input.keyboard.addKey("space");
        nextKey.on("down", () => {
            this.conversationIndex++;
            if (this.kassandraMonologue.length === this.conversationIndex) {
                //this.scene.start(CST.SCENES.LEVEL1);
                this.messageBox.closeWindow();
                setTimeout(() => {
                    this.tweens.add({
                        targets: this.player,
                        y: -600,
                        ease: 'Power1',
                        duration: 700
                    });
                    this.player.destroy();
                    this.scene.start(CST.SCENES.LEVEL0);
                },1500)
            } else if (this.conversationIndex < this.kassandraMonologue.length) {
                this.messageBox.setText(this.kassandraMonologue[this.conversationIndex].dialogue, this.kassandraMonologue[this.conversationIndex].outerWindowColor);
            }
        });
    }

    playerDied() {
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'died').setDepth(1)
        let yesButton = this.add.image(this.game.renderer.width / 2 - 300, this.game.renderer.height / 2 + 50, 'yes').setDepth(1)
        let noButton = this.add.image(this.game.renderer.width / 2 + 300, this.game.renderer.height / 2 + 50, 'no').setDepth(1)
        yesButton.setInteractive();
        noButton.setInteractive();
        yesButton.on("pointerup", () => {
            this.scene.start();
        });
        noButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.MENU);
        });
    }

    createEnemies() {
        this.enemies = [];
        this.enemyRows++;
        let y = 100;
        let index = 0;

        for (let i = 0; i < 7 * this.enemyRows; i++) {
            index++;
            if (index > 7) {
                y = y + 100;
                index = 1;
            }
            let x = 100 * (index - 1) + 100;
            const enemy = new Enemy(this, x, y, index, this.enemyBullets)
            this.enemies.push(enemy);
            this.enemyGroups.add(enemy.sprite);
        }
    }
}

// class ActiveEnemy {
//     sprite: Phaser.Physics.Arcade.Sprite;
//     health: number;
//     index: any;
//     interval: NodeJS.Timeout;
//     constructor(scene: Scene, x: number, y: number, index: number,
//         enemyBullets: Phaser.Physics.Arcade.Group) {
//         this.sprite = scene.physics.add.sprite(x, -200, "greenEnemy");
//         this.sprite.name = `enemy${index}`;
//         scene.tweens.add({
//             targets: this.sprite,
//             y: y,
//             ease: 'Power1',
//             duration: 700
//         });
//         this.health = 100;
//         this.index = index;

//         this.interval = setInterval(() => {
//             let bullet: Bullet | null = enemyBullets.get();
//             if (bullet) {
//                 bullet.setActive(true).setVisible(true);
//                 let velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2()
//                 scene.physics.velocityFromRotation(this.sprite.rotation, 400, velocity);
//                 bullet.fire(this.sprite, { x: velocity.x * (-180) / Math.PI, y: velocity.y * (-180) / Math.PI });
//             }
//         }, Math.floor(Math.random() * Math.floor(2000)) + 1000);
//     }

//     hit() {
//         this.sprite.play('enemyGetHit')
//         this.health -= 50;
//         if (this.health <= 0) {
//             this.sprite.destroy();
//             this.stopAttacking();
//         }
//     }
//     stopAttacking() {
//         clearInterval(this.interval);
//     }
// }