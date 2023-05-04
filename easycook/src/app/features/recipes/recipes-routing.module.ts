import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesViewComponent } from './recipes-view/recipes-view.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const routes: Routes = [
    { path: 'all', component: RecipesViewComponent },
    { path: ':id', component: RecipeDetailsComponent },
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipesRoutingModule {}
