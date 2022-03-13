import { Board } from '../controllers/Board';
import { COLORS, DIMENSIONS } from '../constants';
import { Piece } from '../controllers/Piece';

describe('Board', () => {
    let board: Board;
    beforeEach(() => {
        board = new Board();
    });

    test('create a board', () => {
        expect(new Board()).toEqual(
            expect.objectContaining({
                whitePiecesLeft: 12,
                blackPiecesLeft: 12,
                whiteKings: 0,
                blackKings: 0,
                rows: [0, 1, 2, 3, 4, 5, 6, 7],
                cols: [0, 1, 2, 3, 4, 5, 6, 7],
                board: expect.any(Array),
            })
        );
    });

    test('get a piece from board', () => {
        expect(board.getPiece(0, 0)).toBe(null);
        const firstWhitePiece = board.getPiece(0, 1);
        expect(typeof firstWhitePiece).toEqual('object');
        expect(firstWhitePiece?.getInitialColor()).toEqual(COLORS.WHITE);
    });

    test("select piece and reset all other piece's color", () => {
        const piece = board.getPiece(0, 1);
        const piece2 = board.getPiece(0, 3);

        expect(piece?.getColor()).toBe(COLORS.WHITE);
        expect(piece2?.getColor()).toBe(COLORS.WHITE);

        piece?.setColor(COLORS.BLACK);
        if (piece2 !== null) {
            board.markPieceSelected(piece2);
        }

        expect(piece?.getColor()).toBe(COLORS.WHITE);
        expect(piece2?.getColor()).toBe(COLORS.GREEN);
    });

    test('check winner', () => {
        expect(board.winningColor()).toBe(null);
    });

    function removeAllPiecesWithColor(colorToCheck: number) {
        const rows = [...Array(DIMENSIONS.ROWS).keys()];
        const cols = [...Array(DIMENSIONS.COLS).keys()];
        const piecesToRemove: Piece[] = [];
        rows.map((row) => {
            cols.map((col) => {
                const piece = board.getPiece(row, col);
                if (piece !== null && piece.getInitialColor() === colorToCheck) {
                    piecesToRemove.push(piece);
                }
            });
        });
        board.remove(piecesToRemove);
    }

    test('remove all white pieces and check winner', () => {
        const colorToCheck = COLORS.WHITE;
        removeAllPiecesWithColor(colorToCheck);
        expect(board.winningColor()).toBe(COLORS.BLACK);
    });

    test('remove all black pieces and check winner', () => {
        const colorToCheck = COLORS.BLACK;
        removeAllPiecesWithColor(colorToCheck);
        expect(board.winningColor()).toBe(COLORS.WHITE);
    });

    test('move white piece and make king', () => {
        const blackPiece = board.getPiece(7, 0);
        if (blackPiece !== null) {
            board.remove([blackPiece]);
        }
        const whitePiece = board.getPiece(0, 1);
        if (whitePiece !== null) {
            expect(whitePiece.getIsKing()).toBeFalsy();
            board.move(whitePiece, 7, 0);
        }
        expect(board.getPiece(0, 1)).toBe(null);
        expect(board.getPiece(7, 0)).toBe(whitePiece);
        expect(whitePiece?.getIsKing()).toBeTruthy();
    });

    test('move black piece and make king', () => {
        const blackPiece = board.getPiece(7, 0);

        if (blackPiece !== null) {
            expect(blackPiece.getIsKing()).toBeFalsy();
            board.move(blackPiece, 0, 0);
        }
        expect(board.getPiece(7, 0)).toBe(null);
        expect(board.getPiece(0, 0)).toBe(blackPiece);
        expect(blackPiece?.getIsKing()).toBeTruthy();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });
});
