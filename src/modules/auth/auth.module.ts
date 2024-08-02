import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/model/UserEntity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config'

@Module({
  imports : [
    TypeOrmModule.forFeature([UserEntity]),

    ThrottlerModule.forRoot([{
      ttl: 600000, //milisaniye, 10dk
      limit: 5,
    }]),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
    }),

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
