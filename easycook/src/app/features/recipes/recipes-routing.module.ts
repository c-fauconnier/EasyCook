import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesViewComponent } from './recipes.view/recipes.view.component';

const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipesRoutingModule {}
