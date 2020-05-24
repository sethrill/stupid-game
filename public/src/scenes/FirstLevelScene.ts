import { CST } from "../CST";
import { Bullet } from "../prefabs/Bullet";
export class FirstLevelScene extends Phaser.Scene {
    background!: Phaser.GameObjects.TileSprite;
    player!: Phaser.Physics.Arcade.Sprite;
    keyboard!: { [index: string]: Phaser.Input.Keyboard.Key };
    playerBullets: any;
    enemyBullets: any;
    bullet: any;
    enemyBulletsArray: any[] = [];
    enemyGroups: any;
    enemyRows: number = 0;
    playerDead: boolean = false;
    constructor() {
        super({
            key: CST.SCENES.LEVEL1
        })
    }
    create() {
        // });
        this.background = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, "level_bg").setOrigin(0).setDepth(0);
        this.player = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height * 0.90, "player");
        this.player.setCollideWorldBounds(true);
        this.enemyGroups = this.physics.add.group();
        this.playerBullets = this.physics.add.group({ classType: Bullet, maxSize: 50, runChildUpdate: true });
        this.enemyBullets = this.physics.add.group({ classType: Bullet, maxSize: 50, runChildUpdate: true });
        this.createEnemies();
        this.keyboard = this.input.keyboard.addKeys("a, d");
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
            if (this.bullet) {
                this.bullet.setActive(true).setVisible(true);
                let velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2()
                this.physics.velocityFromRotation(this.player.rotation, 400, velocity);
                this.bullet.fire(this.player, { x: velocity.x * 180 / Math.PI, y: velocity.y * 180 / Math.PI });
            }
        }, this);

        this.physics.world.addCollider(this.playerBullets, this.enemyGroups, (bullet: any, enemy: any) => {
            enemy.play('enemyGetHit')
            //enemy.gotHit(enemy);
            enemy.health = enemy.health - 50;
            if (enemy.health === 0 || enemy.health < 0) {
                enemy.destroy();
                clearInterval(this.enemyBulletsArray[enemy.index]);
            }
            bullet.destroy();

        })
        this.physics.world.addCollider(this.enemyBullets, this.player, () => {
            this.playerDead = true;
            this.player.destroy();
            this.enemyBulletsArray .forEach(element => {
                clearInterval(element);
            });
        })
    }
    update() {
        this.background.tilePositionY -= 0.5;
        if (!this.playerDead) {
            this.player.setVelocity(0);
            if (this.keyboard.a.isDown) {
                this.player.setVelocityX(-400);
            }
            if (this.keyboard.d.isDown) {
                this.player.setVelocityX(400);
            }
            let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.x, this.input.y);
            //rotation cannon
            this.player.setRotation(angle + Math.PI / 2);
        }
        if (this.enemyGroups.children.entries.length === 0) {
            this.createEnemies();
        }

    }

    createEnemies() {
        this.enemyBulletsArray = [];
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
            let enemy = this.physics.add.sprite(x, -200, "greenEnemy");
            enemy.health = 100;
            enemy.index = i;
            this.enemyGroups.add(enemy);
            let tween = this.tweens.add({
                targets: enemy,
                y: y,
                ease: 'Power1',
                duration: 700
            });
            let bullet = setInterval(() => {
                let bullet = this.enemyBullets.get();
                if (bullet) {
                    bullet.setActive(true).setVisible(true);
                    let velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2()
                    this.physics.velocityFromRotation(enemy.rotation, 400, velocity);
                    bullet.fire(enemy, { x: velocity.x * (-180) / Math.PI, y: velocity.y * (-180) / Math.PI });
                }
            }, Math.floor(Math.random() * Math.floor(2000)) + 1000);
            this.enemyBulletsArray.push(bullet);
        }
    }
}
declare global {
    namespace Phaser {
        namespace Physics {
            namespace Arcade {
                interface Sprite {
                    health: number
                    index: number;
                }
            }
        }
    }
}