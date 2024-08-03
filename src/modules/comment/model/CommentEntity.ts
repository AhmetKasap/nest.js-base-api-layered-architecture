import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    text : string
}