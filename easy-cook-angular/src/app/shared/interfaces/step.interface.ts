import { Recipe } from './recipe.interface';

export interface Step {
    number: number;
    explanation: string;
    title: string;
    duration: number;
    recipe: Recipe;
}
