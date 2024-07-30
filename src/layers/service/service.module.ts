import { Module } from '@nestjs/common';
import { UserService } from './User';

@Module({
    providers : [UserService]
})
export class ServiceModule {}
