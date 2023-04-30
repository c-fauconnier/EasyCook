import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/core/interfaces/recipe.interface';

@Component({
    selector: 'app-recipe-card',
    templateUrl: './recipe-card.component.html',
    styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
    @Input() recipe: Recipe = {} as Recipe;
}
