import { Module } from '@nestjs/common';
import { CommentsDBService } from './comments.service';
import { PrismaServicePGDB } from '../prisma';

@Module({
    providers: [CommentsDBService, PrismaServicePGDB]
})
export class CommentsModule {}
