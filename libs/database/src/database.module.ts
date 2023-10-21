import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantDBModule } from './restaurant/restaurant.module';
import { CommentsModule } from './comments/comments.module';
import { UsersDBModule } from './users';

@Module({
    providers: [PrismaModule],
    exports: [PrismaModule],
    imports: [PrismaModule, RestaurantDBModule, CommentsModule, UsersDBModule]
})
export class DatabaseModule {}
