export const DIMENSIONS = {
    WIDTH: 600,
    HEIGHT: 600,
    ROWS: 8,
    COLS: 8,
    SQUARE_SIZE: function () {
        return Math.floor(this.WIDTH / this.COLS);
    },
};

export const COLORS = {
    LIGHT_BROWN: 0xe2c58d,
    DARK_BROWN: 0xa7753d,
    WHITE: 0xffffff,
    BLACK: 0x000000,
    GREEN: 0x007311,
    GREY: 0x808080,
};

export const PIECE_STYLE = {
    OUTLINE: 2,
};
