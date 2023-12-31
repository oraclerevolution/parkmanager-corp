import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingPlace } from './entities/parking-place.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateParkingPlaceDto } from './dto/create-parking-place.dto';
import { UpdateParkingPlace } from './dto/update-parking-place.dto';
import { SearchParkingPlace } from './enums/search-parking-place.enum';

@Injectable()
export class ParkingPlaceService {
    constructor(
        @InjectRepository(ParkingPlace) private readonly repository: Repository<ParkingPlace>
    ) {}

    async createParkingPlace(payload: CreateParkingPlaceDto): Promise<ParkingPlace> {
        const parkingPlace = this.repository.create(payload)
        return await this.repository.save(parkingPlace)
    }

    async getParkingDetails(id: number){
        const parkingDetails = await this.repository.find({
            where:{
                id
            }
        })

        return parkingDetails[0]
    }

    async updateParkingPlace(id: number, payload: UpdateParkingPlace){
        const parkingPlace = await this.repository.find({
            where: {
                id
            }
        });
        if (!parkingPlace) {
            throw new NotFoundException("Parking place not found");
        }
    
        const updated = await this.repository.update(id, payload);
    
        return updated;
    }

    async assignParkingPlaceToUser(
        parkingId: number,
        payload: UpdateParkingPlace
    ): Promise<UpdateResult> {
        const parking_place = await this.repository.find({
            where: {
                id: parkingId
            }
        });
        if (!parking_place) {
            throw new NotFoundException("User not found");
        }

        parking_place[0].availability = false
        parking_place[0].occupationTime = payload.occupationTime
        parking_place[0].occupiedBy = payload.occupiedBy

        const updated = await this.repository.update(parkingId, parking_place[0]);
        return updated;
    }

    async unassignParkingPlaceToUser(
        parkingId: number,
    ): Promise<UpdateResult> {
        const parking_place = await this.repository.find({
            where: {
                id: parkingId
            }
        });
        if (!parking_place) {
            throw new NotFoundException("User not found");
        }

        parking_place[0].availability = true
        parking_place[0].occupationTime = 0
        parking_place[0].occupiedBy = null

        const updated = await this.repository.update(parkingId, parking_place[0]);
        return updated;
    }

    async searchFreeParkingPlaces(
        floorId: number
    ): Promise<SearchParkingPlace>{
        const freeParkingPlaces = await this.repository.findAndCount({
            where: {
                etage: floorId,
                availability: true
            }
        })

        const parkings = freeParkingPlaces[0]
        const count = freeParkingPlaces[1]

        return {
            parkings,
            count
        }
    }

    async searchSeatByUserId(
        userId: number
    ): Promise<ParkingPlace | object>{
        const seat = await this.repository.find({
            where: {
                occupiedBy: userId
            }
        })

        if(seat.length === 0){
            return {
                message: "Le user n'a pas de voiture garée dans le parking",
                status: 404
            }
        }

        return seat
    }
}