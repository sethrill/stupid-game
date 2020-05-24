import { CST } from "../CST";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init() {
    }
    create() {
        //this.scene.start(CST.SCENES.MENU);
        //create background and add title + buttons
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "title").setDepth(1);
        this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(0);
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play').setDepth(1);
        let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 50, 'options').setDepth(1);
        let pvpButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'pvp').setDepth(1);
        //create hover sprite near play button
        let hoverSprite = this.add.sprite(100, 100, "player");
        hoverSprite.setScale(0.7);
        hoverSprite.setVisible(false);

        //create audio
        /* this.sound.pauseOnBlur = false;
        this.sound.play("title_music", {
            loop: true
        });
 */
        //button interactivity
        playButton.setInteractive();
        optionsButton.setInteractive();
        pvpButton.setInteractive();
        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y;
        });
        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        });
        playButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.LEVEL1);
        });

        optionsButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.x = optionsButton.x - 80;
            hoverSprite.y = optionsButton.y;
        });
        optionsButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        });
        optionsButton.on("pointerup", () => {
            //this.scene.launch();
        });
        pvpButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.x = pvpButton.x - 140;
            hoverSprite.y = pvpButton.y;
        });
        pvpButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        });
        pvpButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.PVP);
        });

    }
}