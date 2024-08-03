import { CommentEntity } from "src/modules/comment/model/CommentEntity";
import { UserEntity } from "src/modules/user/model/UserEntity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column()
    title : string

    @Column()
    content : string

    @ManyToOne(() => UserEntity, (user) => user.posts)
    user : UserEntity

    @OneToMany(() => CommentEntity, (comment) => comment.post)
    comments: CommentEntity[]

}