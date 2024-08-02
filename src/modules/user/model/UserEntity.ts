import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PostEntity } from "src/modules/post/model/PostEntity";

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

    @OneToMany(() => PostEntity, (post) => post.users)
    posts : PostEntity[]
}