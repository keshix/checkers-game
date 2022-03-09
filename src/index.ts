import Phaser from 'phaser';
import { PhaserConfig } from './config';
import { CheckersGame }  from './scenes/Game';

new Phaser.Game(
  Object.assign(PhaserConfig, {
    scene: [CheckersGame]
  })
);
