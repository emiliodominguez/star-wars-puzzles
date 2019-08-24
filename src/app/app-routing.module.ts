import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { BoardComponent } from './components/board/board.component';

const routes: Routes = [
    { path: '', component: InstructionsComponent, pathMatch: 'full' },
    { path: ':puzzle', component: BoardComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
