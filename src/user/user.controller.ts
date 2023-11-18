import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { CreateUserLoginDto } from './dto/user-login.dto';
import { UserAuth } from './enums/user-type.enum';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('register')
    async register(
        @Body() payload: CreateUserDto
    ): Promise<User> {
        return await this.userService.register(payload)
    }

    @Post('login')
    async login(
        @Body() payload: CreateUserLoginDto
    ): Promise<UserAuth> {
        return await this.userService.login(payload)
    }

    @Get('user-infos')
    async getUserInfo(
        @Query('id') id: number
    ): Promise<User> {
        return await this.userService.getUserInfo(id)
    }

    @Patch('update-user-infos')
    async updateUserInfo(
        @Query('id') id: number,
        @Body() payload: UpdateUserDto
    ): Promise<UpdateResult> {
        return await this.userService.updateUserInfo(id, payload)
    }
}
