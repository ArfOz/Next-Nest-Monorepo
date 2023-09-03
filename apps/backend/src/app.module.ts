import { Module } from '@nestjs/common';

import { RestaurantModule } from './restaurant/restaurant.module';
import { DatabaseModule } from '@database';

@Module({
  imports: [DatabaseModule, RestaurantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
