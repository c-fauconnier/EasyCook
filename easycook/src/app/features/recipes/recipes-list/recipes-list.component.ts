import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/core/interfaces/recipe.interface';

@Component({
    selector: 'app-recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent {
    @Input() recipesList: Array<Recipe> = [];
}
