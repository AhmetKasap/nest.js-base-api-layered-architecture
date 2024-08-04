import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import 'dotenv/config'
import {postgreDBConnection} from './core/config/postgresql.connection'
import { CommentModule } from './modules/comment/comment.module';
import { LikeModule } from './modules/like/like.module';
import { ChatGptModule } from './modules/chat-gpt/chat-gpt.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,

    postgreDBConnection,

    LikeModule,

    ChatGptModule
  ],
  
  controllers: [],
  providers: [],
})
export class AppModule {}

