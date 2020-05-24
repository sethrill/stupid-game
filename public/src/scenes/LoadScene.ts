import { CST } from "../CST";

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    preload() {
        this.load.image("title_bg", "./assets/images/space.jpg");
        this.load.image("level_bg", "./assets/images/space.png");
        this.load.image("player", "./assets/images/player.png");
        this.load.image("bullet", "./assets/images/bullet.png");
        this.load.spritesheet("greenEnemy", "./assets/images/green_enemy.png", { frameWidth: 52, frameHeight: 48 });
        this.load.image("title", "./assets/images/title.png");
        this.load.image("play", "./assets/images/play.png");
        this.load.image("options", "./assets/images/options.png");
        this.load.image("pvp", "./assets/images/pvp.png");
        this.load.audio("title_music", "./assets/audio/8bit-orchestra.mp3");
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        });

        /*  for (let i = 0; i < 100; i++) {
             console.log(i)
         } */
        this.load.on("progress", (percent: number) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            //console.log(percent);
        });
        this.load.on("load", (file: Phaser.Loader.File) => {
            //console.log(file.src);
        })
    }
    create() {
        //this.scene.add(CST.SCENES.MENU, MenuScene, false)
        this.scene.start(CST.SCENES.MENU);
    }
}