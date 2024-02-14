import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantDBModule } from './restaurant/restaurant.module';
import { CommentsModule } from './comments/comments.module';
import { UsersDBModule } from './users';
import { CommentLikeModule } from './commentslike/commentLike.module';

@Module({
    providers: [PrismaModule],
    exports: [PrismaModule],
    imports: [
        PrismaModule,
        RestaurantDBModule,
        CommentsModule,
        UsersDBModule,
        CommentLikeModule
    ]
})
export class DatabaseModule {}
