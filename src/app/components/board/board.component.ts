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
    public newPuzzle: Subscription;
    public puzzleCharacter: string;
    public puzzleGrid: number[][];
    public puzzlePieces: number[];
    public emptyRow: number;
    public emptyColumn: number;
	public keyCodes: any;
	public puzzleSolved: boolean;

    constructor( private router: Router,
                 private route: ActivatedRoute )
    {
        this.puzzleCharacter = '';
        this.keyCodes = {
            up: 38,
            down: 40,
            left: 37,
            right: 39
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
        this.newPuzzle = this.route.params.subscribe( params => this.puzzleCharacter = params.puzzle );
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.shufflePuzzle( 50 );
	}


    ngOnDestroy(): void
    {
        if( this.newPuzzle != null ) this.newPuzzle.unsubscribe();
    }


    @HostListener('document:keydown', ['$event'])
    public captureKeys( event: KeyboardEvent ): void
    {
        if ( event.keyCode === this.keyCodes.down ||
             event.keyCode === this.keyCodes.up ||
             event.keyCode === this.keyCodes.right ||
			 event.keyCode === this.keyCodes.left )
			 this.moveTo( event.keyCode );

		this.checkWinningGrid();
    }


    public validPosition( row: number,
                   column: number ): boolean
    {
        if ( row < 0 || row >= this.puzzleGrid.length || column < 0 || column >= this.puzzleGrid.length )
            return false;
        else
            return true;
    }


    public updateEmptyPosition( newRow: number,
                         newColumn: number ): void
    {
        this.emptyRow = newRow;
        this.emptyColumn = newColumn;
    }


    public updateGridPositions( rowFirstPosition: number,
                         columnFirstPosition: number,
                         rowSecondPosition: number,
                         columnSecondPosition: number ): void
    {
        let temporalPosition = this.puzzleGrid[rowFirstPosition][columnFirstPosition];

        this.puzzleGrid[rowFirstPosition][columnFirstPosition] = this.puzzleGrid[rowSecondPosition][columnSecondPosition]
        this.puzzleGrid[rowSecondPosition][columnSecondPosition] = temporalPosition;
    }


    public updateDOMpositions( pieceIDone: string,
                        pieceIDtwo: string ): void
    {
        let firstPiece = document.getElementById( pieceIDone );
		let secondPiece = document.getElementById( pieceIDtwo );

        let parentElement = firstPiece.parentNode;

        let firstPieceClone = firstPiece.cloneNode( true );
        let secondPieceClone = secondPiece.cloneNode( true );

        parentElement.replaceChild( firstPieceClone, secondPiece );
        parentElement.replaceChild( secondPieceClone, firstPiece );
    }


    public swapPositions( rowOne: number,
                   columnOne: number,
                   rowTwo: number,
                   columnTwo: number ): void
    {
        let firstPiece = this.puzzleGrid[rowOne][columnOne];
        let secondPiece = this.puzzleGrid[rowTwo][columnTwo];

        this.updateGridPositions( rowOne, columnOne, rowTwo, columnTwo );
        this.updateDOMpositions( 'piece' + firstPiece, 'piece' + secondPiece );
    }


    public moveTo( direction: number ): void
    {
        let newRowPosition;
        let newColumnPosition;

        if ( direction === this.keyCodes.down )
        {
            newRowPosition = this.emptyRow + 1;
            newColumnPosition = this.emptyColumn;
        }
        else if ( direction === this.keyCodes.up )
        {
            newRowPosition = this.emptyRow - 1;
            newColumnPosition = this.emptyColumn;
        }
        else if ( direction === this.keyCodes.right )
        {
            newRowPosition = this.emptyRow;
            newColumnPosition = this.emptyColumn + 1;
        }
        else if ( direction === this.keyCodes.left )
        {
            newRowPosition = this.emptyRow;
            newColumnPosition = this.emptyColumn - 1;
        }

        if ( this.validPosition( newRowPosition, newColumnPosition ) )
        {
            this.swapPositions( this.emptyRow, this.emptyColumn, newRowPosition, newColumnPosition );
            this.updateEmptyPosition( newRowPosition, newColumnPosition );
		}
    }


    public shufflePuzzle( times: number ): void
    {
        if ( times <= 0 ) return;

		const directions = [
			this.keyCodes.up,
			this.keyCodes.down,
			this.keyCodes.left,
			this.keyCodes.right
		];

		while ( times-- )
		{
			let direction = directions[ Math.floor( Math.random() * directions.length ) ];

			setTimeout(() => {
				this.moveTo( direction );
			});
		}

        console.log('Mezclado...');
    }


    public checkWinningGrid()
    {
        const winningPuzzleGrid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
		];

		let counter = 0;

        for ( let i = 0; i < this.puzzleGrid.length; i++ )
        {
            for ( let j = 0; j < winningPuzzleGrid.length; j++ )
            {
                if ( this.puzzleGrid[i][j] == winningPuzzleGrid[i][j] ) counter++;
            }
		}

		if ( counter === 9 ) this.puzzleSolved = true;
    }
}
