import { RecipeIngredient } from './recipe-ingredient.interface';
import { Step } from './step.interface';
import { User } from './user.interface';

export interface Recipe {
    title: string;
    description: string;
    difficulty: number;
    likes: number | null;
    isValid: boolean; // recette approuvée par l'admin
    user?: User;
    steps: Step[];
    ingredients: RecipeIngredient[];
    comments: Comment[];
}
