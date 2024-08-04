import { PostEntity } from "src/modules/post/model/PostEntity";
import { UserEntity } from "src/modules/user/model/UserEntity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LikeEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    count : number

    @ManyToOne(() => UserEntity, (user) => user.likes,  { onDelete: 'CASCADE' })
    user : UserEntity

    @ManyToOne(() => PostEntity, (post) => post.likes,  { onDelete: 'CASCADE' })
    post : PostEntity
}