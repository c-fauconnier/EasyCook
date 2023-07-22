import { RecipeIngredient } from './recipe-ingredient.interface';

export interface Ingredient {
    picture?: string | null;
    name: string;
    recipes: RecipeIngredient[];
}
