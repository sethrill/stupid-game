import { Scene } from "phaser";
import { Bullet } from "./Bullet";

export class Enemy {
    sprite: Phaser.Physics.Arcade.Sprite;
    health: number;
    index: any;
    interval: NodeJS.Timeout;
    constructor(scene: Scene, x: number, y: number, index: number,
        enemyBullets: Phaser.Physics.Arcade.Group) {
        this.sprite = scene.physics.add.sprite(x, -200, "greenEnemy");
        this.sprite.name = `enemy${index}`;
        scene.tweens.add({
            targets: this.sprite,
            y: y,
            ease: 'Power1',
            duration: 700
        });
        this.health = 100;
        this.index = index;

        this.interval = setInterval(() => {
            let bullet: Bullet | null = enemyBullets.get();
            if (bullet) {
                bullet.setActive(true).setVisible(true);
                let velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2()
                scene.physics.velocityFromRotation(this.sprite.rotation, 400, velocity);
                bullet.fire(this.sprite, { x: velocity.x * (-180) / Math.PI, y: velocity.y * (-180) / Math.PI });
            }
        }, Math.floor(Math.random() * Math.floor(2000)) + 1000);
    }

    hit() {
        this.sprite.play('enemyGetHit')
        this.health -= 50;
        if (this.health <= 0) {
            this.sprite.destroy();
            this.stopAttacking();
        }
    }
    stopAttacking() {
        clearInterval(this.interval);
    }
}