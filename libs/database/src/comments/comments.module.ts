import { Module } from '@nestjs/common';
import { CommentsDBService } from './comments.service';
import { PrismaService } from '../prisma';

@Module({
    providers: [CommentsDBService, PrismaService],
})
export class CommentsModule {}
