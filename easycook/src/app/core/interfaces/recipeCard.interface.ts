export interface RecipeCard {
    _id: string;
    title: string;
    author: string;
    //details: Array<RecipeDetails>;
    difficulty: number;
    rating: number;
    total_ratings: number;
    total_comments: number;
    last_modification: Date;
    estimated_time: string;
    category: string;
    cover: string;
    resume: string;
    //comments: Array<RecipeComments>;
}
