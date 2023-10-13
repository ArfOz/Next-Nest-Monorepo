import { Module } from '@nestjs/common';

import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import {
    CommentsDBService,
    DatabaseModule,
    RestaurantDBService,
} from '@database';

@Module({
    imports: [DatabaseModule],
    controllers: [RestaurantController],
    providers: [RestaurantService, CommentsDBService, RestaurantDBService],
})
export class RestaurantModule {}
