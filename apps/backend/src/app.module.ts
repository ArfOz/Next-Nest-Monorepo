import { DatabaseModule } from 'database';
import { Module } from '@nestjs/common';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { RestaurantController } from './restaurant/restaurant.controller';
import { RestaurantService } from './restaurant/restaurant.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, RestaurantController],
  providers: [AppService, RestaurantService],
})
export class AppModule {}
