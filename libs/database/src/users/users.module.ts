import { Module } from '@nestjs/common';
import { UsersDBService } from './users.service';
import { PrismaService } from '../prisma';

@Module({
    providers: [UsersDBService, PrismaService],
    exports: [UsersDBService]
})
export class UsersDBModule {}
