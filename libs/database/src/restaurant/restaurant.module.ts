import { Module } from '@nestjs/common';
import { RestaurantDBService } from './restaurant.service';
import { PrismaServiceMongoDB } from '../prisma';

@Module({
    imports: [],
    exports: [RestaurantDBService],
    providers: [RestaurantDBService, PrismaServiceMongoDB]
})
export class RestaurantDBModule {}
