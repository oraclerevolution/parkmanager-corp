import { User } from "../entities/user.entity";

export type UpdateUserDto = Partial<Omit<User, 'id'>>