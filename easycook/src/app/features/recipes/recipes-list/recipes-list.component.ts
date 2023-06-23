import { Component, Input } from '@angular/core';
import { RecipeCard } from 'src/app/core/interfaces/recipeCard.interface';

@Component({
    selector: 'app-recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent {
    @Input() recipesList: Array<RecipeCard> = [];
}
