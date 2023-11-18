import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingPlace } from './entities/parking-place.entity';
import { Repository } from 'typeorm';
import { CreateParkingPlaceDto } from './dto/create-parking-place.dto';

@Injectable()
export class ParkingPlaceService {
    constructor(
        @InjectRepository(ParkingPlace) private readonly repository: Repository<ParkingPlace>
    ) {}

    async createParkingPlace(payload: CreateParkingPlaceDto): Promise<ParkingPlace> {
        const parkingPlace = this.repository.create(payload)
        return await this.repository.save(parkingPlace)
    }
}
