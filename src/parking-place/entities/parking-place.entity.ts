import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "parking_places"
})

export class ParkingPlace {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({nullable: true})
    placeNumber: number;

    @Column({nullable: true})
    etage: number;

    @Column({nullable: true})
    availability: boolean;

    @Column(({nullable: true, default:0}))
    occupationTime: number;

    @Column({nullable: true})
    occupiedBy: number;

    @CreateDateColumn({name:"created_at"})
    createdAt: Date;

    @UpdateDateColumn({name:"updated_at"})
    updatedAt: Date;
}