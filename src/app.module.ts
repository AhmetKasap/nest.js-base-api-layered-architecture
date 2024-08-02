import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import 'dotenv/config'
import { UserEntity } from './modules/user/model/UserEntity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PostEntity } from './modules/post/model/PostEntity';


@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [UserEntity, PostEntity],
      synchronize: true,}),
  ],
  
  controllers: [],
  providers: [],
})
export class AppModule {}

