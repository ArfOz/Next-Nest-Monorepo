import { Module } from '@nestjs/common';

import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { DatabaseModule, RestaurantDBService } from '@database';

@Module({
  imports: [DatabaseModule],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantDBService],
})
export class RestaurantModule {}
