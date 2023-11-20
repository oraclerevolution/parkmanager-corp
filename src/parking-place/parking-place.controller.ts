import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ParkingPlace } from './entities/parking-place.entity';
import { ParkingPlaceService } from './parking-place.service';
import { CreateParkingPlaceDto } from './dto/create-parking-place.dto';
import { FullAuthenticationGuard } from 'src/full-authentication-guard/full-authentication-guard.guard';
import { AdminAuthGuard } from 'src/admin-guard/admin-guard.guard';
import { UpdateParkingPlace } from './dto/update-parking-place.dto';
import { UpdateResult } from 'typeorm';
import { SearchParkingPlace } from './enums/search-parking-place.enum';

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

    @UseGuards(AdminAuthGuard)
    @Get('')
    async getParkingPlaceDetails(
        @Query('id') id:number
    ){
        return await this.parkingPlaceService.getParkingDetails(id)
    }

    @UseGuards(AdminAuthGuard)
    @Patch('')
    async updateParking(
        @Query("id") id: number,
        @Body() payload: UpdateParkingPlace
    ): Promise<UpdateResult>{
        return await this.parkingPlaceService.updateParkingPlace(id, payload)
    }

    @UseGuards(AdminAuthGuard)
    @Patch('assign-parking-availability')
    async assignParkingAvailability(
        @Query("id") id: number,
        @Body() payload: UpdateParkingPlace
    ): Promise<UpdateResult>{
        return await this.parkingPlaceService.assignParkingPlaceToUser(id, payload)
    }

    @UseGuards(AdminAuthGuard)
    @Patch('unassign-parking-availability')
    async unassignParkingAvailability(
        @Query("id") id: number,
    ): Promise<UpdateResult>{
        return await this.parkingPlaceService.unassignParkingPlaceToUser(id)
    }

    @Get("search-free-parking-places")
    async searchFreeParkingPlaces(
        @Query('id') id: number
    ): Promise<SearchParkingPlace> {
        return await this.parkingPlaceService.searchFreeParkingPlaces(id)
    }
}
