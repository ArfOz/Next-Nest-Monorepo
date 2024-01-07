import { Module } from '@nestjs/common';
import { CommentsDBService } from './comments.Like.service';
import { PrismaServicePGDB } from '../prisma';

@Module({
    providers: [CommentsDBService, PrismaServicePGDB]
})
export class CommentsModule {}
