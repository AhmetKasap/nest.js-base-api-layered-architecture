import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PostEntity } from "src/modules/post/model/PostEntity";
import { CommentEntity } from "src/modules/comment/model/CommentEntity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column()
    name : string

    @Column()
    lastname: string

    @Column({unique : true})
    email : string

    @Column()
    password : string

    @OneToMany(() => PostEntity, (post) => post.user)
    posts : PostEntity[]

    @OneToMany(() => CommentEntity, comment => comment.user)
    comments: CommentEntity[]
}