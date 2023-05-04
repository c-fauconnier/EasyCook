import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipesService } from '../recipes.service';
import { Recipe } from 'src/app/core/interfaces/recipe.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { RecipeCard } from 'src/app/core/interfaces/recipeCard.interface';

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
    //recipe$!: Observable<Recipe>;
    private _recipe: Recipe = {} as Recipe;
    get recipe() {
        return this._recipe;
    }

    constructor(private route: ActivatedRoute, private readonly recipesServices: RecipesService, private router: Router) {}

    ngOnInit(): void {
        const recipeId = this.route.snapshot.params['id'];
        //this.recipe$ = this.recipesServices.getRecipeById(recipeId);
        this.recipesServices.getRecipeById(recipeId).subscribe({
            next: (recipe: Recipe) => {
                if (recipe) this._recipe = recipe;
                console.log(recipe);
            },
            error: (err: HttpErrorResponse) => {
                console.log(err);
                this.router.navigateByUrl('recipes/all');
            },
        });
    }
}
