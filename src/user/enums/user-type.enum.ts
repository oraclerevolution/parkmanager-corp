import { User } from "../entities/user.entity";

export enum UserType {
    ADMIN = 'admin',
    PUBLIC = 'public'
}

export interface UserAuth {
    access_token: string,
    user: Partial<User>,
}