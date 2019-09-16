import { User } from './user';

export class AuthResponse {
    successful: boolean;
    message: string;
    user: User;
    token: string;
}
