import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "../enums/user-type.enum";

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column()
    salt: string

    @Column({
        type:"enum",
        enum: UserType
    })
    role: string

    @Column({nullable: true})
    canAssignPlaces: boolean

    @Column({nullable: true})
    canCreatePlaces: boolean

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date
}