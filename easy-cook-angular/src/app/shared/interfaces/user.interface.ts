import { Role } from '../enums/role.enum';
import { Recipe } from './recipe.interface';
import { Restriction } from './restriction.interface';

export interface User {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    role: Role;
    recipes: Recipe[];
    comments: Comment[];
    restrictions: Restriction[];
}
