import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent
{
    @Input()
    public puzzles: string[];

    public puzzlesVisible: boolean;

    constructor()
    {
        this.puzzlesVisible = false;
    }


    public togglePuzzles(): void
    {
        this.puzzlesVisible = !this.puzzlesVisible;
    }
}
