import { Board } from "./Board";

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
