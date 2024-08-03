import { TypeOrmModule } from "@nestjs/typeorm"
import { PostEntity } from "src/modules/post/model/PostEntity"
import { UserEntity } from "src/modules/user/model/UserEntity"
import 'dotenv/config'
import { CommentEntity } from "src/modules/comment/model/CommentEntity"

export const postgreDBConnection = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserEntity, PostEntity, CommentEntity],
  synchronize: true,}
)