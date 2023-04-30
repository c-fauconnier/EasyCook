import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/core/interfaces/recipe.interface';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {
    constructor(private http: HttpClient) {}

    getRecipes(): Observable<Array<Recipe>> {
        return this.http.get<Array<Recipe>>(`${environment.apiUrl}recipes`);
    }
    createRecipe(recipeId: string): void {}
    updateRecipe(recipeId: string, updateRecipeDto: Partial<Recipe>): void {}
}
