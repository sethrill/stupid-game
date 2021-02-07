import { CST } from "../../CST";
import { IConversation } from "../../prefabs/conversation-interface";
import { DialogBox } from "../../prefabs/dialogBox";

export class PrologueScene extends Phaser.Scene {
    messageBox: any;
    conversationIndex: number = 0;
    text: IConversation[] = [
        { dialogue: 'Earth is under attack!', outerWindowColor: 0x808080 }, 
        { dialogue: 'A mysterious alien force has invaded the solar system and attacked our planet.', outerWindowColor: 0x808080 },
        { dialogue: 'They\'re reading all of our moves. Every counter-attack has failed.', outerWindowColor: 0x808080 },
        { dialogue: 'Our last hope stands in the hands of Earth\'s five best pilots. They have been sent to perform a surprise attack on the enemy\'s main center of command while the Earth\'s remaining forces is pulling all the attention towards them.', outerWindowColor: 0x808080 },
        { dialogue: 'Will they succeed or will they fall followed by the rest of the Earth?', outerWindowColor: 0x808080 }, 
    ]
    constructor() {
        super({key: CST.SCENES.PROLOGUE})
    }

    create() {
        this.messageBox = new DialogBox(this, 300, 400);
        setTimeout(() => {
            this.messageBox.showMessageBox(this.text[0].dialogue, this.text[0].outerWindowColor);
        }, 1000)
        let nextKey = this.input.keyboard.addKey("space");
        nextKey.on("down", () => {
            this.conversationIndex++;
            if (this.text.length === this.conversationIndex) {
                //this.scene.start(CST.SCENES.LEVEL1);
                setTimeout(() => {
                    this.messageBox.closeWindow();
                    setTimeout(() => {
                        this.scene.start(CST.SCENES.LEVEL1);
                    }, 1500);
                },1500)
            } else if (this.conversationIndex < this.text.length) {
                this.messageBox.setText(this.text[this.conversationIndex].dialogue, this.text[this.conversationIndex].outerWindowColor);
            }
        });
    }

    update() {

    }
}