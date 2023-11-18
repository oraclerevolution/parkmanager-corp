import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy, ExtractJwt} from "passport-jwt"
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { Payload } from "./interfaces/payload.interface";

const HEADER_AUTHENTICATION_TOKEN_KEY = "authenticationtoken";
export const FULL_AUTH_GUARD = "FULL_AUTH_GUARD";

@Injectable()
export class FullAuthenticationStrategy extends PassportStrategy(
    Strategy,
    FULL_AUTH_GUARD
){
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(User) private readonly repository: Repository<User>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromHeader(HEADER_AUTHENTICATION_TOKEN_KEY),
            ignoreExpiration: false,
            secretOrKey: "thewolf",
        })
    }

    async validate(payload: Payload){
        const user = await this.repository.findOne({where:{ email: payload.email }})
        
        if(!user){
            throw new UnauthorizedException();
        }
        delete user.password
        delete user.salt
        return user
    }
}