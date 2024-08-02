import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import 'dotenv/config'
import {postgreConnection} from './core/config/postgresql.config'

@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,

    postgreConnection
  ],
  
  controllers: [],
  providers: [],
})
export class AppModule {}

