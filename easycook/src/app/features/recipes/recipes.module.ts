import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { RecipesViewComponent } from './recipes.view/recipes.view.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

@NgModule({
    declarations: [RecipesViewComponent, RecipesListComponent, RecipeCardComponent],
    imports: [CommonModule, RecipesRoutingModule, SharedModule, CoreModule],
})
export class RecipesModule {}
