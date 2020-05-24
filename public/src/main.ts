import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { FirstLevelScene } from "./scenes/FirstLevelScene";
import { PVPScene } from "./scenes/PVPScene";

/** @type {import("../typings/phaser")} */
console.log("hi");
let game = new Phaser.Game({
    width: 800,
    height: 600,
    scene: [
        LoadScene,
        MenuScene,
        FirstLevelScene,
        PVPScene
    ],
    physics: {
        default: "arcade",
        /* arcade: {
            debug: true
        } */
    }
})
