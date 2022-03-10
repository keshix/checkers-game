import { COLORS } from "../constants";
import { Piece } from "./Piece";

test('adding a piece', () => {
    expect(new Piece(0, 0, COLORS.WHITE)).toEqual(
        {
            "HALF_SQUARE_SIZE": 37, 
            "OUTLINE": 2, 
            "PADDING": 10, 
            "SQUARE_SIZE": 75, 
            "col": 0, 
            "color": 16777215, 
            "isKing": false, 
            "row": 0, 
            "xPosition": 37, 
            "yPosition": 37
        }
    );
});

test('moving a piece', () => {
    const piece = new Piece(0, 0, COLORS.WHITE);
    piece.move(3, 3);
    expect(piece.getPosition()).toEqual(
        {
            "col": 3, 
            "row": 3, 
            "xPosition": 262, 
            "yPosition": 262
        }
    );
    piece.move(0, 0);
    expect(piece.getPosition()).toEqual(
        {
            "col": 0, 
            "row": 0, 
            "xPosition": 37, 
            "yPosition": 37
        }
    );
});

test('make king', () => {
    const piece = new Piece(0, 0, COLORS.BLACK);
    expect(piece.getIsKing()).toBeFalsy;
    piece.makeKing();
    expect(piece.getIsKing()).toBeTruthy;
});