import { User } from './user.interface';

export interface Restriction {
    isRestricted: boolean;
    reason: string;
    user: User;
}
