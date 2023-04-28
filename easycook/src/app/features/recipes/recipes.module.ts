import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { RecipesViewComponent } from './recipes.view/recipes.view.component';

@NgModule({
    declarations: [RecipesViewComponent],
    imports: [CommonModule, RecipesRoutingModule, SharedModule, CoreModule],
})
export class RecipesModule {}
