import { CST } from "../CST";

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    preload() {
        this.load.image("title_bg", "./assets/images/space.jpg");
        this.load.image("intro", "./assets/images/intro-text.png");
        this.load.image("press_space", "./assets/images/press-space.png");
        this.load.image("died", "./assets/images/dead.png");
        this.load.image("yes", "./assets/images/yes.png");
        this.load.image("no", "./assets/images/no.png");
        this.load.image("level_bg", "./assets/images/space.png");
        this.load.image("player", "./assets/images/player.png");
        this.load.image("ship0", "./assets/images/ship0.png");
        this.load.image("ship1", "./assets/images/ship1.png");
        this.load.image("ship2", "./assets/images/ship2.png");
        this.load.image("ship3", "./assets/images/ship3.png");
        this.load.image("ship4", "./assets/images/ship4.png");
        this.load.image("flame1", "./assets/images/Flame_01.png");
        this.load.image("flame2", "./assets/images/Flame_02.png");
        this.load.image("bullet", "./assets/images/bullet.png");
        this.load.spritesheet("greenEnemy", "./assets/images/green_enemy.png", { frameWidth: 52, frameHeight: 48 });
        this.load.spritesheet("explosion", "./assets/images/explosion.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("explosion2", "./assets/images/explosion2.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("explosion3", "./assets/images/explosion3.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("explosion4", "./assets/images/explosion4.png", { frameWidth: 64, frameHeight: 64 });
        this.load.image("title", "./assets/images/title.png");
        this.load.image("play", "./assets/images/play.png");
        this.load.image("options", "./assets/images/options.png");
        this.load.image("pvp", "./assets/images/pvp.png");
        this.load.image("black_square", "./assets/images/square.png");
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