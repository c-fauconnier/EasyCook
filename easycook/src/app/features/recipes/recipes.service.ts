import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeCard } from 'src/app/core/interfaces/recipeCard.interface';
import { environment } from './../../environments/environment';
import { Observable, map } from 'rxjs';
import { Recipe } from 'src/app/core/interfaces/recipe.interface';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {
    constructor(private http: HttpClient) {}

    getRecipes(): Observable<Array<RecipeCard>> {
        return this.http.get<Array<RecipeCard>>(`${environment.apiUrl}/recipes`);
    }

    getRecipeById(recipeId: number): Observable<Recipe> {
        return this.http.get<Recipe>(`${environment.apiUrl}/recipes/${recipeId}`);
    }

    //createRecipe(recipeId: string): void {}
    //updateRecipe(recipeId: string, updateRecipeDto: Partial<Recipe>): void {}
}
