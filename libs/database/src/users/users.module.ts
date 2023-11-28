import { Module } from '@nestjs/common';
import { UsersDBService } from './users.service';
import { PrismaServiceMongoDB, PrismaServicePGDB } from '../prisma';

@Module({
    providers: [UsersDBService, PrismaServiceMongoDB, PrismaServicePGDB],
    exports: [UsersDBService]
})
export class UsersDBModule {}
