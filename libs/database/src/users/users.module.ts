import { Module } from '@nestjs/common';
import { UsersDBService } from './users.service';

@Module({
    providers: [UsersDBService],
    exports: [UsersDBService]
})
export class UsersDBModule {}
