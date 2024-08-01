import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id : number

    @Column()
    name : string

    @Column()
    lastname: string

    @Column({unique : true})
    email : string

    @Column()
    password : string
}