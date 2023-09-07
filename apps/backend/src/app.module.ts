import { Module } from '@nestjs/common';

import { RestaurantModule } from './restaurant/restaurant.module';
import { DatabaseModule } from '@database';
import { AuthGuard } from '@guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import generalConfig from '@config/src/general.config';

@Module({
  imports: [
    DatabaseModule,
    RestaurantModule,
    ConfigModule.forFeature(generalConfig),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
