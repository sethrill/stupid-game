import { CST } from "../../CST";

export class Level2Scene extends Phaser.Scene {
    background!: Phaser.GameObjects.TileSprite;
    player!: Phaser.Physics.Arcade.Sprite;
    keyboard!: Record<'a' | 'd', Phaser.Input.Keyboard.Key>;
    playerDead: boolean = false;
    levelEnded: boolean = false;

    constructor() {
        super({
            key: CST.SCENES.LEVEL2
        })
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, "level_bg").setOrigin(0).setDepth(0);
        this.player = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height * 0.90, "player");
        this.player.setCollideWorldBounds(true);
        this.keyboard = this.input.keyboard.addKeys("a, d") as this['keyboard'];
    }

    update() {
        this.background.tilePositionY -= 3;
        if (!this.playerDead && !this.levelEnded) {
            this.player.setVelocity(0);
            if (this.keyboard.a.isDown) {
                this.player.setVelocityX(-400);
            }
            if (this.keyboard.d.isDown) {
                this.player.setVelocityX(400);
            }
        }
    }
}