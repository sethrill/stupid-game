export class Enemy extends Phaser.GameObjects.Sprite {
    health: number;
    scene: any;
    constructor(scene: any, x: number, y: number) {
        super(scene, x, y, 'greenEnemy');
        this.scene = scene;
        this.scene.add.existing(this);
        this.health = 100;
    }

    createEnemy(x: number, y: number) {
        this.setPosition(x, y);
    }

    // gotHit(enemy: any) {
    //     console.log(this.body.velocity.x)
    //     this.body.velocity.x = 3;
    //     this.scene.anims.create({
    //         key: 'enemyGetHit',
    //         repeat: 1,
    //         frameRate: 30,
    //         frames: this.scene.anims.generateFrameNames("greenEnemy", {
    //             frames: [0, 1, 2, 0]
    //         })
    //     });
    //     enemy.play("enemyGetHit");
    // }
}