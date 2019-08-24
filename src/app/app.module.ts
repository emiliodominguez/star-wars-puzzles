import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BoardComponent } from './components/board/board.component';
import { InstructionsComponent } from './components/instructions/instructions.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		BoardComponent,
		InstructionsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
