import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base-http.services';
import { Recipe } from '../shared/interfaces/recipe.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class RecipesService extends BaseService<Recipe> {
    endPoint: string = 'recipes';
    constructor(http: HttpClient) {
        super(http);
    }
}
