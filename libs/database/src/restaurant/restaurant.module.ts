import { Module } from '@nestjs/common';
import { RestaurantDBService } from './restaurant.service';
import { PrismaService } from '../prisma';

@Module({
  imports: [],
  exports: [RestaurantDBService],
  providers: [RestaurantDBService, PrismaService],
})
export class RestaurantDBModule {}
