import { Module } from '@nestjs/common';
import { ParkingPlaceController } from './parking-place.controller';
import { ParkingPlaceService } from './parking-place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingPlace } from './entities/parking-place.entity';
import { FullAuthenticationStrategy } from 'src/full-authentication-guard/full-authentication.strategy';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { AdminAuthStrategy } from 'src/admin-guard/admin-guard.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingPlace,User]),
    UserModule
  ],
  controllers: [ParkingPlaceController],
  providers: [ParkingPlaceService, FullAuthenticationStrategy, AdminAuthStrategy],
  exports:[ParkingPlaceService]
})
export class ParkingPlaceModule {}
