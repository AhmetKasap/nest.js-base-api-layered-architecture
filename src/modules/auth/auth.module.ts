import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/model/UserEntity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports : [
    TypeOrmModule.forFeature([UserEntity]),

    ThrottlerModule.forRoot([{
      ttl: 600000, //milisaniye, 10dk
      limit: 5,
    }]),

  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide : APP_GUARD,
      useClass : ThrottlerGuard
    }
  ]
})
export class AuthModule {}
