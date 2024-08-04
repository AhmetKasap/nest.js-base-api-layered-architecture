import { CommentEntity } from "src/modules/comment/model/CommentEntity";
import { LikeEntity } from "src/modules/like/model/LikeEntity";
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

    @ManyToOne(() => UserEntity, (user) => user.posts,  { onDelete: 'CASCADE' })
    user : UserEntity

    @OneToMany(() => CommentEntity, (comment) => comment.post, { cascade: true, onDelete: 'CASCADE' })
    comments: CommentEntity[]

    @OneToMany(() => LikeEntity, (like) => like.post, { cascade: true, onDelete: 'CASCADE' })
    likes: LikeEntity[]

    toDto() {
        return {
            id : this.id,
            title : this.title,
            content : this.content
        }
    }

}