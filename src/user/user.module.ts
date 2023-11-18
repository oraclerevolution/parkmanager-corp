import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FullAuthenticationStrategy } from 'src/full-authentication-guard/full-authentication.strategy';
import { AdminAuthStrategy } from 'src/admin-guard/admin-guard.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: "thewolf",
      signOptions: {
        expiresIn: "1d"
      }
    }),
    JwtModule
  ],
  controllers: [UserController],
  providers: [UserService, FullAuthenticationStrategy, AdminAuthStrategy],
  exports:[UserService]
})
export class UserModule {}
