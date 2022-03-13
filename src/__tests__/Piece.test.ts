import { COLORS } from '../constants';
import { Piece } from '../controllers/Piece';

describe('Piece', () => {
    test('adding a piece', () => {
        expect(new Piece(0, 0, COLORS.WHITE)).toEqual({
            HALF_SQUARE_SIZE: 37,
            PADDING: 10,
            SQUARE_SIZE: 75,
            color: 16777215,
            initialColor: 16777215,
            isKing: false,
            boardPosition: {
                col: 0,
                row: 0,
            },
            xPosition: 37,
            yPosition: 37,
        });
    });

    test('moving a piece', () => {
        const piece = new Piece(0, 0, COLORS.WHITE);
        piece.move(3, 3);
        expect(piece.getPosition()).toEqual({
            col: 3,
            row: 3,
            xPosition: 262,
            yPosition: 262,
        });
        piece.move(0, 0);
        expect(piece.getPosition()).toEqual({
            col: 0,
            row: 0,
            xPosition: 37,
            yPosition: 37,
        });
    });

    test('make king', () => {
        const piece = new Piece(0, 0, COLORS.BLACK);
        expect(piece.getIsKing()).toBeFalsy();
        piece.makeKing();
        expect(piece.getIsKing()).toBeTruthy();
    });

    test('get, set and reset color', () => {
        const piece = new Piece(0, 0, COLORS.WHITE);
        expect(piece.getColor()).toBe(COLORS.WHITE);
        expect(piece.getInitialColor()).toBe(COLORS.WHITE);
        piece.setColor(COLORS.GREEN);
        expect(piece.getColor()).toBe(COLORS.GREEN);
        expect(piece.getInitialColor()).toBe(COLORS.WHITE);
        piece.resetColor();
        expect(piece.getColor()).toBe(COLORS.WHITE);
        expect(piece.getInitialColor()).toBe(COLORS.WHITE);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
});
