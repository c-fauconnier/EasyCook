import { Recipe } from './recipe.interface';
import { User } from './user.interface';

export interface Comment {
    title: string;
    content: string;
    rating: number;
    signals: number;
    author: User;
    recipe: Recipe;
}
