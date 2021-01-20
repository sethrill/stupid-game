import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { Level1Scene } from "./scenes/levels/Level1Scene";
import { Level0Scene } from "./scenes/levels/Level0Scene";
import { PVPScene } from "./scenes/PVPScene";
import { Level2Scene } from "./scenes/levels/Level2Scene";
import { PrologueScene } from "./scenes/levels/PrologueScene";

/** @type {import("../typings/phaser")} */
console.log("hi");
let game = new Phaser.Game({
    width: 800,
    height: 600,
    scene: [
        LoadScene,
        MenuScene,
        PrologueScene,
        Level0Scene,
        Level1Scene,
        Level2Scene,
        PVPScene
    ],
    physics: {
        default: "arcade",
        /* arcade: {
            debug: true
        } */
    }
})
