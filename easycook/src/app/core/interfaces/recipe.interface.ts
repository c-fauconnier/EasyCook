import { RecipeComments } from './comments.interface';
import { RecipeDetails } from './details.interface';
export interface Recipe {
    _id: string;
    title: string;
    author: string;
    details?: Array<RecipeDetails>;
    difficulty: number;
    rating: number;
    total_ratings: number;
    total_comments: number;
    last_modification: Date;
    estimated_time: string;
    comments: Array<RecipeComments>;
}
