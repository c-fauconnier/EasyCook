import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { RecipeCard } from 'src/app/core/interfaces/recipeCard.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-recipes-view',
    templateUrl: './recipes-view.component.html',
    styleUrls: ['./recipes-view.component.scss'],
})
export class RecipesViewComponent implements OnInit {
    private _recipes: Array<RecipeCard> = [];
    get recipes() {
        return this._recipes;
    }

    constructor(private readonly recipesService: RecipesService) {}

    ngOnInit(): void {
        this.recipesService.getRecipes().subscribe({
            next: (recipes: Array<RecipeCard>) => {
                if (recipes.length) this._recipes = recipes;
            },
            error: (err: HttpErrorResponse) => {},
        });
    }
}
