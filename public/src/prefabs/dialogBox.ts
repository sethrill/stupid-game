import { Scene } from "phaser";

export class DialogBox extends Phaser.GameObjects.Image {
    messageBox: any;
    scene: any
    graphics: any
    padding: number = 32;
    windowHeight: number = 150;
    text: any;
    eventCounter: number = 0;
    dialog: any;
    timedEvent: any;
    dialogSpeed: number = 200;
    outerWindowColor: number = 0x907748;
    dimensions: any;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'black_square');
        this.scene = scene;
        this.graphics = this.scene.add.graphics()
    }
    create() { }

    // showMessageBox(text: string, w = this.getGameWidth(), h = this.getGameHeight()) {
    //     if (this.messageBox) {
    //         this.messageBox.destroy();
    //     }
    //     this.createWindow();
    // }

    showMessageBox(text: string, outerWindowColor?: number) {
        if (outerWindowColor) this.outerWindowColor = outerWindowColor;
        const gameHeight = this.getGameHeight();
        const gameWidth = this.getGameWidth();
        this.dimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
        this.graphics = this.scene.add.graphics();
        this.createOuterWindow(this.dimensions.x, this.dimensions.y, this.dimensions.rectWidth, this.dimensions.rectHeight);
        this.createInnerWindow(this.dimensions.x, this.dimensions.y, this.dimensions.rectWidth, this.dimensions.rectHeight);
        this.setText(text, outerWindowColor, true);
    }
    createInnerWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
        this.graphics.fillStyle(0x303030, 1);
        this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }

    createOuterWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
        this.graphics.lineStyle(3, this.outerWindowColor, 1);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    }

    getGameWidth() {
        return this.scene.sys.game.config.width;
    }

    getGameHeight() {
        return this.scene.sys.game.config.height;
    }

    calculateWindowDimensions(width: number, height: number) {
        const x = this.padding;
        const y = height - this.windowHeight - this.padding;
        const rectWidth = width - (this.padding * 2);
        const rectHeight = this.windowHeight;
        return {
            x,
            y,
            rectWidth,
            rectHeight
        };
    }

    setText(text: string, outerWindowColor?: number, animate: boolean = true) {
        console.log(outerWindowColor)
        if (outerWindowColor) {
            this.outerWindowColor = outerWindowColor;
            this.createOuterWindow(this.dimensions.x, this.dimensions.y, this.dimensions.rectWidth, this.dimensions.rectHeight);
        }
        // Reset the dialog
        this.eventCounter = 0;
        this.dialog = text.split('');
        if (this.timedEvent) this.timedEvent.remove();

        var tempText = animate ? '' : text;
        this._setText(tempText);

        if (animate) {
            this.timedEvent = this.scene.time.addEvent({
                delay: 150 - (this.dialogSpeed * 5),
                callback: this.animateText,
                callbackScope: this,
                loop: true
            });
        }
    }

    _setText(text: string) {
        // Reset the dialog
        if (this.text) this.text.destroy();
        var x = this.padding + 10;
        var y = this.getGameHeight() - this.windowHeight - this.padding + 10;

        this.text = this.scene.make.text({
            x,
            y,
            text,
            style: {
                wordWrap: { width: this.getGameWidth() - (this.padding * 2) - 25 }
            }
        });
    }
    animateText() {
        this.eventCounter++;
        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
        if (this.eventCounter === this.dialog.length) {
            this.timedEvent.remove();
        }
    }
    closeWindow() {
        this.graphics.visible = false;
        this.text.visible = false;
    }
}