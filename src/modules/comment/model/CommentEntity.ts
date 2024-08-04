import { PostEntity } from "src/modules/post/model/PostEntity";
import { UserEntity } from "src/modules/user/model/UserEntity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommentDTO } from "../dto/CommentDTO";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    text : string

    @ManyToOne(() => PostEntity, (post) => post.comments,  { onDelete: 'CASCADE' })
    post: PostEntity

    @ManyToOne(() => UserEntity, (user) => user.comments)
    user: UserEntity

    toDto()  {
        return {
            id : this.id,
            text : this.text,
        }
    }

    
}