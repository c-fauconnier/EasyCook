import { Unit } from '../enums/unit.enum';
import { Ingredient } from './ingredient.interface';
import { Recipe } from './recipe.interface';

export interface RecipeIngredient {
    quantity: number;
    unit: Unit;
    recipe: Recipe;
    ingredient: Ingredient;
}
