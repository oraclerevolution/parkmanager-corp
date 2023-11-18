import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt"
import { UserAuth, UserType } from './enums/user-type.enum';
import { CreateUserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    /**
     * Registers a new user with the provided payload.
     *
     * @param {CreateUserDto} payload - The payload containing user registration data.
     * @return {Promise<User>} - A promise that resolves to the registered user.
     */
    async register(payload: CreateUserDto): Promise<User> {
        const user = this.repository.create({
            ...payload,
        })
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, user.salt)
        if (payload.role === UserType.ADMIN) {
            user.canAssignPlaces = true
            user.canCreatePlaces = true
        }
        
        try {
            await this.repository.save(user)
            return user
        } catch (error) {
            console.log(error)
            throw new Error("Something went wrong during registering user")
        }
    }

    /**
     * Authenticates a user with the provided credentials.
     *
     * @param {CreateUserLoginDto} credentials - The user credentials.
     * @return {Promise<UserAuth>} - The authenticated user information.
     */
    async login(credentials: CreateUserLoginDto): Promise<UserAuth> {
        const {email, password} = credentials
        //we verify if user exist
        const user = await this.repository.createQueryBuilder("user").where("user.email = :email", {email}).getOne()
        //if user doesn't exist, we throw an error
        if (!user) {
            throw new NotFoundException("Connexion impossible, l'utilisateur n'existe pas")
        }

        const hashedPassword = await bcrypt.hash(password, user.salt)
        if(hashedPassword === user.password){
            const payload = {
                email: user.email,
                password: user.password,
                role: user.role
            }

            const token = this .jwtService.sign(payload)
            delete user.salt
            delete user.password
            return {
                access_token: token,
                user
            }
        }else{
            throw new NotFoundException("Connexion impossible, vérifiez vos identifiants")
        }
    }

    /**
     * Retrieves the user information based on the provided id.
     *
     * @param {number} id - The id of the user to retrieve information for.
     * @return {Promise<User>} A promise that resolves to the user information.
     */
    async getUserInfo(id: number): Promise<User>{
        const user = await this.repository.find({
            where: {
                id
            }
        })
        if(!user){
            throw new NotFoundException("User not found")
        }

        const userFound = user[0]
        delete userFound.password
        delete userFound.salt
        return userFound
    }

/**
 * Updates the user information with the given ID.
 *
 * @param {number} id - The ID of the user to update.
 * @param {UpdateUserDto} payload - The payload containing the updated user information.
 * @returns {Promise<UpdateResult>} - A promise that resolves to the result of the update operation.
 */
async updateUserInfo(id: number, payload: UpdateUserDto): Promise<UpdateResult> {
    const user = await this.repository.find({
        where: {
            id
        }
    });
    if (!user) {
        throw new NotFoundException("User not found");
    }

    const updated = await this.repository.update(id, payload);

    return updated;
}
}
