import Phaser from 'phaser';

export const PhaserConfig = {
    type: Phaser.CANVAS,
    parent: 'game',
    scale: {
        width: 600,
        height: 600,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    fps: {
        target: 30,
        forceSetTimeOut: true,
    },
};
