import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public title: string;
	public puzzles: string[];

	constructor() {
		this.title = 'Star Wars Puzzles';
		this.puzzles = [
			'luke',
			'yoda',
			'vader',
			'bobafett'
		];
	}
}
