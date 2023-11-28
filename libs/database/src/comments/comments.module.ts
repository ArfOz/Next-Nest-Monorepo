import { Module } from '@nestjs/common';
import { CommentsDBService } from './comments.service';
import { PrismaServiceMongoDB } from '../prisma';

@Module({
    providers: [CommentsDBService, PrismaServiceMongoDB]
})
export class CommentsModule {}
