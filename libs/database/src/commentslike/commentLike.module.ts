import { Module } from '@nestjs/common';
import { CommentLikeDBService } from './commentsLike.service';
import { PrismaServicePGDB } from '../prisma';

@Module({
    providers: [CommentLikeDBService, PrismaServicePGDB]
})
export class CommentLikeModule {}
