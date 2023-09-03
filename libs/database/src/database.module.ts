import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  providers: [PrismaModule],
  exports: [PrismaModule],
  imports: [PrismaModule, RestaurantModule],
})
export class DatabaseModule {}
