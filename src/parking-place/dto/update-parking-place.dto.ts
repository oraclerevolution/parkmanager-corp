import { ParkingPlace } from "../entities/parking-place.entity";

export type UpdateParkingPlace = Partial<Omit<ParkingPlace, 'id'>>