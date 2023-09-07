import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantDBModule } from './restaurant/restaurant.module';

@Module({
  providers: [PrismaModule],
  exports: [PrismaModule],
  imports: [PrismaModule, RestaurantDBModule],
})
export class DatabaseModule {}
