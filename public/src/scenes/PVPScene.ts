import { CST } from '../CST';
import { PVPBullet } from '../prefabs/PVPBullets';
import io from 'socket.io-client';

declare global {
    namespace Phaser {
        namespace Physics {
            namespace Arcade {
                interface Sprite {
                    oldPosition: any
                }
            }
        }
    }
}
export class PVPScene extends Phaser.Scene {
    socket!: SocketIOClient.Socket;
    background!: Phaser.GameObjects.TileSprite;
    player!: Phaser.Physics.Arcade.Sprite;
    otherPlayer!: Phaser.Physics.Arcade.Sprite;
    otherPlayers: any = [];
    keyboard!: { [index: string]: Phaser.Input.Keyboard.Key };
    playerBullets: any;
    playerFiredBullet: any
    otherPlayerBullets: any
    otherFiredBullet: any
    constructor() {
        super({
            key: CST.SCENES.PVP
        })
    }

    create() {
        this.socket = io();
        this.background = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, "level_bg").setOrigin(0).setDepth(0);
        this.keyboard = this.input.keyboard.addKeys("w, a, d, s");
        this.playerBullets = this.physics.add.group({ classType: PVPBullet, maxSize: 50, runChildUpdate: true });
        this.otherPlayerBullets = this.physics.add.group({ classType: PVPBullet, maxSize: 50, runChildUpdate: true });
        this.socket.on('currentPlayers', (players: Record<string, IPlayerInfo>) => {
            console.log(players);
            Object.keys(players).forEach(id => {
                if (players[id].playerId === this.socket.id) {
                    this.createPlayer(players[id]);
                } else {
                    this.createOtherPlayer(players[id]);
                }
            })
        });
        this.socket.on('newPlayer', (playerInfo: IPlayerInfo) => {
            console.log(playerInfo)
            this.createOtherPlayer(playerInfo);
        });
        this.socket.on('disconnect', (playerId: string) => {
            this.otherPlayers.forEach((otherPlayer: any) => {
                if (playerId === otherPlayer.playerId) {
                    otherPlayer.player.destroy();
                }
            });
        });
        this.socket.on('playerMoved', (playerInfo: IPlayerInfo) => {
            this.otherPlayers.forEach((otherPlayer: any) => {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.player.setRotation(playerInfo.rotation);
                    otherPlayer.player.setPosition(playerInfo.x, playerInfo.y);
                }
            });
        });
        this.socket.on('playerShot', (playerInfo: IPlayerInfo) => {
            this.otherPlayers.forEach((otherPlayer: any) => {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    this.otherFiredBullet = this.otherPlayerBullets.get();
                    if (this.otherFiredBullet) {
                        this.otherFiredBullet.setActive(true).setVisible(true);
                        let velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2()
                        this.physics.velocityFromRotation(playerInfo.rotation, 400, velocity);
                        this.otherFiredBullet.fire(otherPlayer.player, { x: velocity.x * 180 / Math.PI, y: velocity.y * 180 / Math.PI });
                        console.log(this.physics.overlap(this.player, this.otherFiredBullet))
                        if (this.physics.overlap(this.player, this.otherFiredBullet)) {
                            console.log("hit")
                        }
                    }
                }
            });
        })
        this.input.on('pointerdown', () => {
            this.playerFiredBullet = this.playerBullets.get();
            if (this.playerFiredBullet) {
                this.playerFiredBullet.setActive(true).setVisible(true);
                let velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2()
                this.physics.velocityFromRotation(this.player.rotation, 400, velocity);
                this.playerFiredBullet.fire(this.player, { x: velocity.x * 180 / Math.PI, y: velocity.y * 180 / Math.PI });
                this.socket.emit('playerShoot', { x: this.player.x, y: this.player.y, rotation: this.player.rotation });
            }
        }, this);
    }

    createPlayer(playerInfo: IPlayerInfo) {
        this.player = this.physics.add.sprite(playerInfo.x, playerInfo.y, "player");
        this.player.setCollideWorldBounds(true);
    }

    createOtherPlayer(playerInfo: IPlayerInfo) {
        this.otherPlayer = this.physics.add.sprite(playerInfo.x, playerInfo.y, "player");
        this.otherPlayer.setCollideWorldBounds(true);
        let playerObj = {
            playerId: playerInfo.playerId,
            player: this.otherPlayer
        }
        this.otherPlayers.push(playerObj);
    }

    update() {
        if (this.player) {
            this.player.setVelocity(0);
            if (this.keyboard.a.isDown) {
                this.player.setVelocityX(-250);
            }
            if (this.keyboard.d.isDown) {
                this.player.setVelocityX(250);
            }
            if (this.keyboard.w.isDown) {
                this.player.setVelocityY(-250);
            }
            if (this.keyboard.s.isDown) {
                this.player.setVelocityY(250);
            }
            let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.x, this.input.y);
            //rotation cannon
            this.player.setRotation(angle + Math.PI / 2);
            let x = this.player.x;
            let y = this.player.y;
            let r = this.player.rotation;
            if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y || r !== this.player.oldPosition.rotation)) {
                this.socket.emit('playerMovement', { x: this.player.x, y: this.player.y, rotation: this.player.rotation });
            }
            this.player.oldPosition = {
                x: this.player.x,
                y: this.player.y,
                rotation: this.player.rotation
            };
        }
        if (this.player && this.otherFiredBullet && this.physics.overlap(this.player, this.otherFiredBullet)) {
            console.log("hit");
            this.otherFiredBullet.destroy();
            this.player.destroy();
        }
        if(this.otherPlayer && this.playerFiredBullet && this.physics.overlap(this.otherPlayer, this.playerFiredBullet)){
            console.log("other hit");
            this.playerFiredBullet.destroy();
            this.otherPlayer.destroy();
        }
    }
}

interface IPlayer {
    key: IPlayerInfo
}

interface IPlayerInfo {
    rotation: number;
    x: number;
    y: number;
    playerId: string;
    team: string
}