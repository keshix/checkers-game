import Phaser from 'phaser';

export class CheckersGame extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('crown', 'assets/crown.png');
  }

  create() {
    //const logo = this.add.image(400, 70, 'crown');
    const r1 = this.add.rectangle(0, 0, 200, 200, 0x6666ff);
    const r2 = this.add.rectangle(100, 100, 400, 400, 0xffffff).setOrigin(0,0);
    
  }
}
