import Phaser from 'phaser';

export const DIMENSIONS = {
  WIDTH: 600,
  HEIGHT: 600,
  ROWS: 8,
  COLS: 8,
  SQUARE_SIZE: function() {
    return Math.floor(this.WIDTH / this.COLS)
  }
};

export const COLORS = {
  LIGHT_BROWN: '#E2C58D',
  DARK_BROWN: '#A7753D',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  BLUE: '#5F98E8',
  GREY: '#808080'
}