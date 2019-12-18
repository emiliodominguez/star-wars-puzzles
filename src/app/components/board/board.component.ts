import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy
{
    private newPuzzle: Subscription;
    private puzzleCharacter: string;
    private puzzleGrid: number[][];
    private puzzlePieces: number[];
    private emptyRow: number;
    private emptyColumn: number;
    private keyCodes: any;
    private puzzleSolved: boolean;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    )
    {
        this.puzzleCharacter = '';
        this.keyCodes = {
            up: 'ArrowUp',
            down: 'ArrowDown',
            left: 'ArrowLeft',
            right: 'ArrowRight'
        };
        this.puzzleGrid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        this.puzzlePieces = [].concat(...this.puzzleGrid);
        this.emptyRow = 2;
        this.emptyColumn = 2;
        this.puzzleSolved = false;
    }

    ngOnInit(): void
    {
        this.newPuzzle = this.route.params.subscribe(params => this.puzzleCharacter = params.puzzle);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.shufflePuzzle(50);
    }

    ngOnDestroy(): void
    {
        if (this.newPuzzle != null)
        {
            this.newPuzzle.unsubscribe();
        }
    }

    @HostListener('document:keydown', ['$event'])
    private captureKeys(event: KeyboardEvent): void
    {
        if (event.key === this.keyCodes.down ||
            event.key === this.keyCodes.up ||
            event.key === this.keyCodes.right ||
            event.key === this.keyCodes.left)
        {

            this.moveTo(event.key);
        }

        this.checkWinningGrid();
    }

    private validPosition(row: number, column: number): boolean
    {
        if (row < 0 || row >= this.puzzleGrid.length || column < 0 || column >= this.puzzleGrid.length)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    private updateEmptyPosition(newRow: number, newColumn: number): void
    {
        this.emptyRow = newRow;
        this.emptyColumn = newColumn;
    }

    private updateGridPositions(
        rowFirstPosition: number,
        columnFirstPosition: number,
        rowSecondPosition: number,
        columnSecondPosition: number): void
    {
        const temporalPosition = this.puzzleGrid[rowFirstPosition][columnFirstPosition];

        this.puzzleGrid[rowFirstPosition][columnFirstPosition] = this.puzzleGrid[rowSecondPosition][columnSecondPosition];
        this.puzzleGrid[rowSecondPosition][columnSecondPosition] = temporalPosition;
    }

    private updateDOMpositions(pieceIDone: string, pieceIDtwo: string): void
    {
        const firstPiece = document.getElementById(pieceIDone);
        const secondPiece = document.getElementById(pieceIDtwo);
        const parentElement = firstPiece.parentNode;
        const firstPieceClone = firstPiece.cloneNode(true);
        const secondPieceClone = secondPiece.cloneNode(true);

        parentElement.replaceChild(firstPieceClone, secondPiece);
        parentElement.replaceChild(secondPieceClone, firstPiece);
    }

    private swapPositions(
        rowOne: number,
        columnOne: number,
        rowTwo: number,
        columnTwo: number): void
    {
        const firstPiece = this.puzzleGrid[rowOne][columnOne];
        const secondPiece = this.puzzleGrid[rowTwo][columnTwo];

        this.updateGridPositions(rowOne, columnOne, rowTwo, columnTwo);
        this.updateDOMpositions('piece' + firstPiece, 'piece' + secondPiece);
    }

    private moveTo(direction: string): void
    {
        let newRowPosition: number;
        let newColumnPosition: number;

        if (direction === this.keyCodes.down)
        {
            newRowPosition = this.emptyRow + 1;
            newColumnPosition = this.emptyColumn;
        }
        else if (direction === this.keyCodes.up)
        {
            newRowPosition = this.emptyRow - 1;
            newColumnPosition = this.emptyColumn;
        }
        else if (direction === this.keyCodes.right)
        {
            newRowPosition = this.emptyRow;
            newColumnPosition = this.emptyColumn + 1;
        }
        else if (direction === this.keyCodes.left)
        {
            newRowPosition = this.emptyRow;
            newColumnPosition = this.emptyColumn - 1;
        }

        if (this.validPosition(newRowPosition, newColumnPosition))
        {
            this.swapPositions(this.emptyRow, this.emptyColumn, newRowPosition, newColumnPosition);
            this.updateEmptyPosition(newRowPosition, newColumnPosition);
        }
    }

    private shufflePuzzle(times: number): void
    {
        if (times <= 0)
        {
            return;
        }

        const directions = [
            this.keyCodes.up,
            this.keyCodes.down,
            this.keyCodes.left,
            this.keyCodes.right
        ];

        while (times--)
        {
            const direction = directions[Math.floor(Math.random() * directions.length)];

            setTimeout(() =>
            {
                this.moveTo(direction);
            });
        }
    }

    private checkWinningGrid()
    {
        const winningPuzzleGrid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

        let counter = 0;

        for (let i = 0; i < this.puzzleGrid.length; i++)
        {
            for (let j = 0; j < winningPuzzleGrid.length; j++)
            {
                if (this.puzzleGrid[i][j] === winningPuzzleGrid[i][j])
                {
                    counter++;
                }
            }
        }

        if (counter === 9)
        {
            this.puzzleSolved = true;
        }
    }
}
