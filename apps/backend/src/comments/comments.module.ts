import {
    CommentsDBService,
    DatabaseModule,
    RestaurantDBService,
} from '@database';
import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
    imports: [DatabaseModule],
    controllers: [CommentsController],
    providers: [CommentsService, CommentsDBService, RestaurantDBService],
})
export class CommentsModule {}
