import { TypeOrmModule } from "@nestjs/typeorm"
import { PostEntity } from "src/modules/post/model/PostEntity"
import { UserEntity } from "src/modules/user/model/UserEntity"
import 'dotenv/config'
import { CommentEntity } from "src/modules/comment/model/CommentEntity"
import { LikeEntity } from "src/modules/like/model/LikeEntity"

export const postgreDBConnection = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserEntity, PostEntity, CommentEntity, LikeEntity],
  synchronize: true,}
)