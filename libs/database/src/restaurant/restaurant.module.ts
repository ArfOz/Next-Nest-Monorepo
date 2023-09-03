import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { PrismaService } from '../prisma';

@Module({
  imports: [],
  exports: [RestaurantService],
  providers: [RestaurantService, PrismaService],
})
export class RestaurantDBModule {}
