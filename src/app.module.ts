import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config'

@Module({
  imports: [UsersModule, AuthModule, AccountModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [],
      synchronize: true,
  }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
