import { Scene } from "phaser";
import { COLORS, DIMENSIONS } from "../constants";
import { Piece } from "./Piece";
import _ from "lodash";


export class Board {

    private board: (Piece|null)[][];
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

        this.rows.map(row => {
            _.range(row % 2, DIMENSIONS.COLS, 2).map(col => {
                scene.add.rectangle(
                    row * SQUARE_SIZE, 
                    col * SQUARE_SIZE, 
                    SQUARE_SIZE, 
                    SQUARE_SIZE, 
                    COLORS.LIGHT_BROWN
                ).setOrigin(0, 0);
            });
        });
    }

    public createBoard() {
        this.rows.map(row => {
            this.board.push([]);
            this.cols.map(col => {
                if (col % 2 == ((row +  1) % 2)) {
                    if (row <= 2) {
                        this.board[row].push(new Piece(row, col, COLORS.WHITE));
                    }
                    else if (row >= 5) {
                        this.board[row].push(new Piece(row, col, COLORS.BLACK));
                    }
                    else {
                        this.board[row].push(null);
                    }
                }
                else {
                    this.board[row].push(null);
                }

            });
            
        });
    }

    public drawBoard(scene: Scene) {
        this.drawSquares(scene);
        this.rows.map(row => {
            this.cols.map(col => {
                const piece = this.board[row][col];
                if (piece !== null) {
                    piece.drawPiece(scene);
                }
            });
        });
    }

}