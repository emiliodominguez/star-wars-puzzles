import { Component } from '@angular/core';

@Component({
    selector: 'app-instructions',
    templateUrl: './instructions.component.html',
    styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent
{
	private instructions: string[];

	constructor()
	{
		this.instructions = [
			"Utilizá las flechas del teclado para mover las piezas",
			"Orderná las piezas para alcanzar el objetivo"
		];
	}

	private toggleInstructions( language ): void
	{
		switch ( language ) {
			case 'ES':
				this.instructions = [
					"Utilizá las flechas del teclado para mover las piezas",
					"Orderná las piezas para alcanzar el objetivo"
				];
				break;
			case 'EN':
				this.instructions = [
					"Use the arrow keys in order to move the pieces",
					"Order the pieces to achieve the goal"
				];
				break;
		}
	}
}
