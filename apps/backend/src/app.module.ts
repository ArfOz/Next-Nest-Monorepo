import { Module } from '@nestjs/common';

import { RestaurantModule } from './restaurant/restaurant.module';
import { CommentsModule } from './comments/comments.module';
import { CommentLikeModule, DatabaseModule } from '@database';
import { AuthGuard } from '@guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import generalConfig from '@config/src/general.config';
import { EventsModule } from './events/events.module';

@Module({
    imports: [
        ConfigModule.forFeature(generalConfig),
        DatabaseModule,
        RestaurantModule,
        CommentsModule,
        CommentLikeModule,
        UserModule,
        EventsModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AppModule {}
