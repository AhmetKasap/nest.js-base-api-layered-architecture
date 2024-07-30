import { Module } from '@nestjs/common';
import { UserController } from './User';

@Module({
  controllers: [UserController]
})
export class ControllerModule {}
