import { CST } from "../../CST";
import { Bullet } from "../../prefabs/Bullet";
import { DialogBox } from "../../prefabs/dialogBox";

export class Level0Scene extends Phaser.Scene {
    background!: Phaser.GameObjects.TileSprite;
    player!: Phaser.Physics.Arcade.Sprite;
    ships: Phaser.Physics.Arcade.Sprite[] = [];
    rocketFlames: Phaser.GameObjects.Sprite[] = [];
    explosion!: Phaser.Physics.Arcade.Sprite
    bullet!: Phaser.Physics.Arcade.Sprite;
    firedBullet?: Bullet;
    messageBox: any;
    conversationIndex: number = 0;
    nextKey: any;
    conversation: IConversation[] = [
        {dialogue: 'Captain: Alright team, we\'re getting close. The enemy is right ahead. The main fleet is pulling most of the enemy ships towards them, so that can perform a surprise direct attack on their main cruiser and and disable the whole army. This is our only chance to defeat them, we have to succed. Everyone is depending on us...', outerWindowColor: 0xff0000}, 
        {dialogue: 'Captain: Our ships have been equiped with the most advanced weapons earth currently has.', outerWindowColor: 0xff0000}, {dialogue: 'Marco: Captain, we didn\'t have the chance to test the new weapons and everything seems to be deactivated except the main cannons...', outerWindowColor: 0x008000},
        {dialogue: 'Captain: Don\' worry Marco, the weapons work just fine. As a precaution, the weapons have been deactivated.', outerWindowColor: 0xff0000},
        {dialogue: 'Kassandra: Why though? It\'s not like the aliens care about stealing our ships. They have much more advanced weapons and ships than us. That\'s why we\'re losing in the first place.', outerWindowColor: 0xffff00},
        {dialogue: 'Annie: They deactivated the weapons because they knew you were going to be on the team. They didn\'t want to risk you blowing up the base, Kassandra.', outerWindowColor: 0x800080},
        {dialogue: 'Kassandra: Hilarious. What if we get attacked now? What will you do with your weapons locked, Annie? Sasha isn\'t here to save you again.', outerWindowColor: 0xffff00},
        {dialogue: 'Annie: You little bit...', outerWindowColor: 0x800080},
        {dialogue: 'Jean: Kassandra has a point. It was a stupid idea to come all the way out here with everything locked. Our cannons won\'t be enough if we encounter the aliens.', outerWindowColor: 0x00b8ff},
        {dialogue: 'Captain: Enough! We are Earth\'s last hope and you decide to argue!? It was my decisions to have them locked and I have the codes to unlock them. Jean, I\'m transmitting you the codes to activate the weapons for your ship.', outerWindowColor: 0xff0000},
        {dialogue: 'Jean: Codes received. Weapons unlocked and activated.', outerWindowColor: 0x00b8ff}, 
        {dialogue: 'Captain: Marco, you\'re next.', outerWindowColor: 0xff0000},
        {dialogue: 'Marco: Weapons activated!', outerWindowColor: 0x008000},
        {dialogue: 'Captain: Annie, it\'s your turn.', outerWindowColor: 0xff0000},
        {dialogue: 'Annie: Received and activated, captain!', outerWindowColor: 0x800080},
        {dialogue: 'Captain: Kassandra, you\'re last. I\'m sending you the co...', outerWindowColor: 0xff0000},
    ];
    shipsDetails = [{ x: 135, y: 350, color: 0x04ff00 }, { x: 135 * 2, y: 330, color: 0xfff700 }, { x: 135 * 3, y: 310, color: 0xff3bb1 }, { x: 135 * 4, y: 330, color: 0xc619ff }, { x: 135 * 5, y: 350, color: 0 }]

    constructor() {
        super({
            key: CST.SCENES.LEVEL0
        })
    }

    create() {
        this.cameras.main.fadeIn(500);
        this.background = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, "level_bg").setOrigin(0).setDepth(0);
        this.messageBox = new DialogBox(this, 300, 400);
        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNames("explosion")
        });
        this.anims.create({
            key: 'rocketFlame',
            frames: [
                { key: 'flame1' },
                { key: 'flame2' }
            ],
            frameRate: 10,
            repeat: -1
        });
        this.createShips();
        this.nextKey = this.input.keyboard.addKey("space");
        setTimeout(() => {
            this.playDialogue(this.conversation);
        }, 1000)
    }

    playDialogue(conversation: IConversation[]) {
        this.conversationIndex = 0;
        this.messageBox.showMessageBox(conversation[0].dialogue, conversation[0].outerWindowColor);
        this.nextKey.on("down", () => {
            this.conversationIndex++;
            if (conversation.length === this.conversationIndex) {
                //this.scene.start(CST.SCENES.LEVEL1);
                this.createBulletsAndCollision();
                this.messageBox.closeWindow();
            } else if (this.conversationIndex < this.conversation.length) {
                this.messageBox.setText(conversation[this.conversationIndex].dialogue, conversation[this.conversationIndex].outerWindowColor);
            }
            //this.createBulletsAndCollision()
        });
    }

    update() {
        this.background.tilePositionY -= 9;
    }

    createShips() {
        for (let i = 0; i < 5; i++) {
            let ship = this.physics.add.sprite(this.shipsDetails[i].x, this.shipsDetails[i].y, "ship" + i).setDepth(3);
            let rocketFlame = this.add.sprite(this.shipsDetails[i].x, this.shipsDetails[i].y + 45, 'flame1').setScale(0.5).play('rocketFlame');
            ship.setScale(0.22);
            this.rocketFlames.push(rocketFlame);
            this.ships.push(ship);
        }
    }

    createBulletsAndCollision() {
        for (let i = 0; i < 4; i++) {
            let bullet = this.physics.add.sprite(this.ships[i].x, -300, "bullet").setDepth(2);
            let explosion = this.physics.add.sprite(this.ships[i].x, this.ships[i].y, "explosion").setDepth(2);
            explosion.scale = 3;
            this.physics.world.addCollider(this.ships[i], bullet, () => {
                explosion.play('explosion');
                this.ships[i].destroy();
                this.rocketFlames[i].destroy();
                bullet.destroy();
            });
            setTimeout(() => {
                this.tweens.add({
                    targets: bullet,
                    y: 1200,
                    ease: 'Power1',
                    duration: 700
                });
            }, i * 100);
        }
    }
}

interface IConversation {
    dialogue: string;
    outerWindowColor: number;
}