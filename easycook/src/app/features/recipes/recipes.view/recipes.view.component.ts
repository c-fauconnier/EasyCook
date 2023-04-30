import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from 'src/app/core/interfaces/recipe.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-recipes.view',
    templateUrl: './recipes.view.component.html',
    styleUrls: ['./recipes.view.component.scss'],
})
export class RecipesViewComponent implements OnInit {
    private _recipes: Array<Recipe> = [];
    get recipes() {
        return this._recipes;
    }

    constructor(private readonly recipesService: RecipesService) {}

    ngOnInit(): void {
        this.recipesService.getRecipes().subscribe({
            next: (recipes: Array<Recipe>) => {
                if (recipes.length) this._recipes = recipes;
            },
            error: (err: HttpErrorResponse) => {},
        });
    }
}
