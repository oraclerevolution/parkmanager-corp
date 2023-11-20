import { ParkingPlace } from "../entities/parking-place.entity";

export interface SearchParkingPlace {
    parkings: ParkingPlace[],
    count: number
}