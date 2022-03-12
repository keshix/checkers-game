import { Scene } from 'phaser';
import { COLORS, DIMENSIONS, PIECE_STYLE } from '../constants';

export class Piece {
    private SQUARE_SIZE = DIMENSIONS.SQUARE_SIZE();
    private HALF_SQUARE_SIZE = Math.floor(this.SQUARE_SIZE / 2);
    private PADDING = 10;

    private row: number;
    private col: number;
    private color: number;
    private initialColor: number;
    private isKing: boolean;
    private xPosition: number;
    private yPosition: number;

    constructor(row: number, col: number, color: number) {
        this.row = row;
        this.col = col;
        this.color = color;
        this.initialColor = color;
        this.isKing = false;
        this.xPosition = 0;
        this.yPosition = 0;
        this.calcAndSetPosition();
    }

    calcAndSetPosition(): Piece {
        this.xPosition = this.SQUARE_SIZE * this.col + this.HALF_SQUARE_SIZE;
        this.yPosition = this.SQUARE_SIZE * this.row + this.HALF_SQUARE_SIZE;
        return this;
    }

    makeKing() {
        this.isKing = true;
    }

    drawPiece(scene: Scene) {
        let radius = this.HALF_SQUARE_SIZE - this.PADDING;
        scene.add.circle(this.xPosition, this.yPosition, radius + PIECE_STYLE.OUTLINE, COLORS.GREY);
        scene.add.circle(this.xPosition, this.yPosition, radius, this.color);
        if (this.isKing) {
            scene.add.sprite(this.xPosition, this.yPosition, 'crown');
        }
    }

    move(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.calcAndSetPosition();
    }

    getPosition() {
        return {
            row: this.row,
            col: this.col,
            xPosition: this.xPosition,
            yPosition: this.yPosition,
        };
    }

    getInitialColor() {
        return this.initialColor;
    }

    getColor() {
        return this.color;
    }

    setColor(color: number) {
        return (this.color = color);
    }

    resetColor() {
        this.color = this.initialColor;
    }

    getIsKing() {
        return this.isKing;
    }
}
