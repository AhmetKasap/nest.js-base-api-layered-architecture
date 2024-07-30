import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllerModule } from './layers/controller/controller.module';
import { ServiceModule } from './layers/service/service.module';
import 'dotenv/config'

@Module({
  imports: [ ControllerModule,ServiceModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [],
      synchronize: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
