import { CommentsDBService, DatabaseModule } from '@database';
import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
    imports: [DatabaseModule],
    controllers: [CommentsController],
    providers: [CommentsService, CommentsDBService],
})
export class CommentsModule {}
