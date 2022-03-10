import Phaser from 'phaser';
import { Board } from '../controllers/Board';

export class CheckersGame extends Phaser.Scene {

  private board: Board;

  constructor() {
    super('GameScene');
    this.board = new Board();
  }

  preload() {
    this.load.image('crown', 'assets/crown.png');
  }

  create() {
    this.board.drawBoard(this);
    
  }
}
