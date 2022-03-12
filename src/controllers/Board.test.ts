import { Board } from "./Board";
import { Piece } from "./Piece";

test('create a board', () => {
    expect(new Board()).toEqual(
        expect.objectContaining(
            {
                whitePiecesLeft: 12,
                blackPiecesLeft: 12,
                whiteKings: 0,
                blackKings: 0,
                rows: [0,1,2,3,4,5,6,7],
                cols: [0,1,2,3,4,5,6,7],
                board: expect.any(Array)
            }
        )
    );
});

test('get a piece from board', () => {
    const board = new Board();
    expect(board.getPiece(0, 0)).toBe(null);
    expect(typeof board.getPiece(0, 1)).toEqual("object");
});