import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantDBModule } from './restaurant/restaurant.module';
import { CommentsModule } from './comments/comments.module';

@Module({
    providers: [PrismaModule],
    exports: [PrismaModule],
    imports: [PrismaModule, RestaurantDBModule, CommentsModule],
})
export class DatabaseModule {}
