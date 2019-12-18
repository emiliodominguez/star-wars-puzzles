import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent
{
    private readonly title: string;
    private readonly puzzles: string[];

    constructor()
    {
        this.title = 'Star Wars Puzzles';
        this.puzzles = [
            'luke',
            'yoda',
            'darth-vader',
            'darth-maul',
            'bobafett',
            'mandalorian',
            'kylo-ren',
            'rey',
            'bb8',
            'c3po',
            'k2so',
            'stormtrooper'
        ];
    }
}

