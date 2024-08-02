import { UserEntity } from "src/modules/user/model/UserEntity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

}