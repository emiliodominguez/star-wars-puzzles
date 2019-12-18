import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent
{
    @Input()
    private readonly puzzles: string[];

    private puzzlesVisible: boolean;

    constructor()
    {
        this.puzzlesVisible = false;
    }

    private togglePuzzles(): void
    {
        this.puzzlesVisible = !this.puzzlesVisible;
    }
}
