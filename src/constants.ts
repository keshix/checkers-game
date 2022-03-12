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
  LIGHT_BROWN: 0xE2C58D,
  DARK_BROWN: 0xA7753D,
  WHITE: 0xFFFFFF,
  BLACK: 0x000000,
  BLUE: 0x5F98E8,
  GREY: 0x808080
}

export const PIECE_STYLE = {
  OUTLINE: 2
}