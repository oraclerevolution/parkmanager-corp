import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ParkingPlace } from './entities/parking-place.entity';
import { ParkingPlaceService } from './parking-place.service';
import { CreateParkingPlaceDto } from './dto/create-parking-place.dto';
import { FullAuthenticationGuard } from 'src/full-authentication-guard/full-authentication-guard.guard';
import { AdminAuthGuard } from 'src/admin-guard/admin-guard.guard';

@UseGuards(FullAuthenticationGuard)
@Controller('parking-place')
export class ParkingPlaceController {
    constructor(
        private readonly parkingPlaceService: ParkingPlaceService
    ) {}

    @UseGuards(AdminAuthGuard)
    @Post('create-parking-place')
    async createParkingPlace(
        @Body() payload: CreateParkingPlaceDto
    ): Promise<ParkingPlace> {
        return await this.parkingPlaceService.createParkingPlace(payload)
    }
}
