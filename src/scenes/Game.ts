import _ from 'lodash';
import Phaser from 'phaser';
import { COLORS, DIMENSIONS } from '../constants';
import { Board } from '../controllers/Board';
import { Piece } from '../controllers/Piece';
import { PiecePosition } from '../types/PiecePosition';

export class CheckersGame extends Phaser.Scene {
    private board: Board;
    private selectedPiece: Piece | null;
    private turnColor: number;
    private validMoves: Map<PiecePosition, Piece[]>;
    private SQUARE_SIZE = DIMENSIONS.SQUARE_SIZE();
    private HALF_SQUARE_SIZE = Math.floor(this.SQUARE_SIZE / 2);

    constructor() {
        super('GameScene');
        this.board = new Board();
        this.selectedPiece = null;
        this.turnColor = COLORS.WHITE;
        this.validMoves = new Map<PiecePosition, Piece[]>();
    }

    preload() {
        this.load.image('crown', 'assets/crown.png');
        this.load.image('black-wins', 'assets/black-wins.png');
        this.load.image('white-wins', 'assets/white-wins.png');
    }

    create() {
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const { row, col } = CheckersGame.getColAndRowFromMousePos(pointer.downX, pointer.downY);
            this.selectOrMovePiece(row, col);
        });
    }

    update() {
        this.board.drawBoard(this);
        this.drawValidMoves(this.validMoves);
        this.checkWinnerAndShow();
    }

    private static getColAndRowFromMousePos(xPos: number, yPos: number) {
        const row = Math.floor(yPos / DIMENSIONS.SQUARE_SIZE());
        const col = Math.floor(xPos / DIMENSIONS.SQUARE_SIZE());
        return { row, col };
    }

    private selectOrMovePiece(row: number, col: number) {
        if (this.selectedPiece) {
            const moveSuccessful = this.move(this.selectedPiece, row, col);
            if (!moveSuccessful) {
                this.selectedPiece = null;
                this.selectOrMovePiece(row, col);
            }
        }

        const piece = this.board.getPiece(row, col);
        if (piece && piece.getInitialColor() == this.turnColor) {
            this.selectedPiece = piece;
            this.board.markPieceSelected(piece);
            this.validMoves = this.board.getValidMoves(piece);
            return true;
        }
        return false;
    }

    private isMoveInValidMoves(piecePos: PiecePosition) {
        let isValidMove = false;
        this.validMoves.forEach((skippedPieces, positionOnBoard) => {
            if (_.isEqual(positionOnBoard, piecePos)) {
                isValidMove = true;
            }
        });
        return isValidMove;
    }

    private findSkippedPieces(piecePos: PiecePosition) {
        let skippedPieces: Piece[] = [];
        this.validMoves.forEach((pieces, positionOnBoard) => {
            if (_.isEqual(positionOnBoard, piecePos)) {
                skippedPieces = pieces;
            }
        });
        return skippedPieces;
    }

    private move(selectedPiece: Piece, row: number, col: number) {
        const piece = this.board.getPiece(row, col);
        const canMoveToEmptyField = selectedPiece && piece == null && this.isMoveInValidMoves({ row, col });
        if (canMoveToEmptyField) {
            this.board.move(selectedPiece, row, col);
            const skippedPieces = this.findSkippedPieces({ row, col });
            if (skippedPieces) {
                this.board.remove(skippedPieces);
            }
            this.changeTurn(selectedPiece);
            return true;
        }

        return false;
    }

    private changeTurn(piece: Piece) {
        this.validMoves = new Map();
        if (piece) {
            piece.setColor(piece.getInitialColor());
        }
        this.turnColor === COLORS.BLACK ? (this.turnColor = COLORS.WHITE) : (this.turnColor = COLORS.BLACK);
    }

    private checkWinnerAndShow() {
        const color = this.board.winningColor();
        if (color !== null) {
            const winnerImage = color === COLORS.BLACK ? 'black-wins' : 'white-wins';
            this.add.sprite(this.scale.width / 2, this.scale.height / 2, winnerImage);
        }
    }

    private drawValidMoves(moves: Map<PiecePosition, Piece[]>) {
        moves.forEach((skippedPieces, positionOnBoard) => {
            this.add.circle(
                positionOnBoard.col * this.SQUARE_SIZE + this.HALF_SQUARE_SIZE,
                positionOnBoard.row * this.SQUARE_SIZE + this.HALF_SQUARE_SIZE,
                15,
                COLORS.GREEN
            );
        });
    }
}
