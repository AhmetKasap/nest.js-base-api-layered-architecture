import { PostEntity } from "src/modules/post/model/PostEntity";
import { UserEntity } from "src/modules/user/model/UserEntity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    text : string

    @ManyToOne(() => PostEntity, (post) => post.comments)
    post: PostEntity

    @ManyToOne(() => UserEntity, (user) => user.comments)
    user: UserEntity
}