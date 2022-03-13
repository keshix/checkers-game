import { Scene } from 'phaser';
import { COLORS, DIMENSIONS } from '../constants';
import { Piece } from './Piece';
import _, { last } from 'lodash';
import { PiecePosition } from '../types/PiecePosition';

export class Board {
    private board: (Piece | null)[][];
    private whitePiecesLeft: number;
    private blackPiecesLeft: number;
    private whiteKings: number;
    private blackKings: number;
    private rows: number[];
    private cols: number[];

    constructor() {
        this.board = [];
        this.whitePiecesLeft = 12;
        this.blackPiecesLeft = 12;
        this.whiteKings = 0;
        this.blackKings = 0;
        this.rows = [...Array(DIMENSIONS.ROWS).keys()];
        this.cols = [...Array(DIMENSIONS.COLS).keys()];
        this.createBoard();
    }

    private drawSquares(scene: Scene) {
        scene.add.rectangle(0, 0, DIMENSIONS.WIDTH, DIMENSIONS.HEIGHT, COLORS.DARK_BROWN).setOrigin(0, 0);

        const SQUARE_SIZE = DIMENSIONS.SQUARE_SIZE();

        this.rows.map((row) => {
            _.range(row % 2, DIMENSIONS.COLS, 2).map((col) => {
                scene.add
                    .rectangle(row * SQUARE_SIZE, col * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE, COLORS.LIGHT_BROWN)
                    .setOrigin(0, 0);
            });
        });
    }

    public createBoard() {
        this.rows.map((row) => {
            this.board.push([]);
            this.cols.map((col) => {
                if (col % 2 == (row + 1) % 2) {
                    if (row <= 2) {
                        this.board[row].push(new Piece(row, col, COLORS.WHITE));
                    } else if (row >= 5) {
                        this.board[row].push(new Piece(row, col, COLORS.BLACK));
                    } else {
                        this.board[row].push(null);
                    }
                } else {
                    this.board[row].push(null);
                }
            });
        });
    }

    public drawBoard(scene: Scene) {
        this.drawSquares(scene);
        this.rows.map((row) => {
            this.cols.map((col) => {
                const piece = this.board[row][col];
                if (piece !== null) {
                    piece.drawPiece(scene);
                }
            });
        });
    }

    private resetPieceColors() {
        this.board.map((row) => {
            row.map((col) => {
                if (col !== null) col.resetColor();
            });
        });
    }

    private swapPiecePositions(piece: Piece, moveRow: number, moveCol: number) {
        const piecePos = piece.getPosition();
        [this.board[piecePos.row][piecePos.col], this.board[moveRow][moveCol]] = [
            this.board[moveRow][moveCol],
            this.board[piecePos.row][piecePos.col],
        ];
        return this.board;
    }

    public move(piece: Piece, row: number, col: number) {
        this.swapPiecePositions(piece, row, col);
        piece.move(row, col);

        if (row === DIMENSIONS.ROWS - 1 || row === 0) {
            piece.makeKing();
            piece.getInitialColor() === COLORS.WHITE ? this.whiteKings++ : this.blackKings++;
        }
    }

    public remove(pieces: Piece[]) {
        pieces.map((piece) => {
            const piecePos = piece.getPosition();
            this.board[piecePos.row][piecePos.col] = null;
            if (piece) {
                piece.getInitialColor() === COLORS.BLACK ? this.blackPiecesLeft-- : this.whitePiecesLeft--;
            }
        });
    }

    public winningColor() {
        if (this.blackPiecesLeft <= 0) return COLORS.WHITE;
        else if (this.whitePiecesLeft <= 0) return COLORS.BLACK;
        return null;
    }

    public markPieceSelected(piece: Piece) {
        this.resetPieceColors();
        piece.setColor(COLORS.GREEN);
    }

    public getPiece(row: number, col: number) {
        return this.board[row][col] || null;
    }

    public getValidMoves(piece: Piece): Map<PiecePosition, Piece[]> {
        let moves = new Map<PiecePosition, Piece[]>();
        const piecePos = piece.getPosition();
        const left = piecePos.col - 1;
        const right = piecePos.col + 1;
        const row = piecePos.row;
        const pieceColor = piece.getInitialColor();

        if (pieceColor === COLORS.BLACK || piece.getIsKing()) {
            moves = new Map([
                ...moves.entries(),
                ...this.traverse('left', row - 1, _.max([row - 3, -1]), -1, pieceColor, left).entries(),
            ]);
            moves = new Map([
                ...moves.entries(),
                ...this.traverse('right', row - 1, _.max([row - 3, -1]), -1, pieceColor, right).entries(),
            ]);
        }
        if (pieceColor === COLORS.WHITE || piece.getIsKing()) {
            moves = new Map([
                ...moves.entries(),
                ...this.traverse('left', row + 1, _.min([row + 3, DIMENSIONS.ROWS]), 1, pieceColor, left).entries(),
            ]);
            moves = new Map([
                ...moves.entries(),
                ...this.traverse('right', row + 1, _.min([row + 3, DIMENSIONS.ROWS]), 1, pieceColor, right).entries(),
            ]);
        }

        return moves;
    }

    private findSkipMoves(
        lastField: Piece[],
        step: number,
        row: number,
        moves: Map<PiecePosition, Piece[]>,
        color: number,
        nextCol: number
    ) {
        if (lastField.length > 0) {
            const nextRow = step === -1 ? _.max([row - 3, 0]) : _.min([row + 3, DIMENSIONS.ROWS]);
            moves = new Map([
                ...moves.entries(),
                ...this.traverse('left', row + step, nextRow, step, color, nextCol - 1, lastField).entries(),
            ]);
            moves = new Map([
                ...moves.entries(),
                ...this.traverse('right', row + step, nextRow, step, color, nextCol + 1, lastField).entries(),
            ]);
        }
        return moves;
    }

    private traverse(
        direction: string,
        start: number,
        stop: number | undefined,
        step: number,
        color: number,
        nextCol: number,
        skippedPieces: Piece[] = []
    ) {
        let moves = new Map<PiecePosition, Piece[]>();
        let lastField: Piece[] = [];

        for (const row of _.range(start, stop, step)) {
            if ((direction === 'left' && nextCol < 0) || (direction === 'right' && nextCol >= DIMENSIONS.COLS)) break;

            const current = this.board[row][nextCol];

            if (!current) {
                if (skippedPieces.length > 0 && lastField.length === 0) {
                    break;
                } else if (skippedPieces.length > 0) {
                    moves.set({ row, col: nextCol }, [...lastField, ...skippedPieces]);
                } else {
                    moves.set({ row, col: nextCol }, [...lastField]);
                }

                moves = this.findSkipMoves(lastField, step, row, moves, color, nextCol);
                break;
            } else if (current.getInitialColor() === color) {
                break;
            } else {
                lastField = [current];
            }

            direction === 'left' ? nextCol-- : nextCol++;
        }

        return moves;
    }
}
