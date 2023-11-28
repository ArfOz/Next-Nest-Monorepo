import { Module } from '@nestjs/common';
import { UsersDBService } from './users.service';
import { PrismaServiceMongoDB } from '../prisma';

@Module({
    providers: [UsersDBService, PrismaServiceMongoDB],
    exports: [UsersDBService]
})
export class UsersDBModule {}
