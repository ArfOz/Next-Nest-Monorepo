import { Module } from '@nestjs/common';

import { RestaurantModule } from './restaurant/restaurant.module';
import { DatabaseModule } from '@database';
import { AuthGuard } from '@guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';
import generalConfig from '@config/src/general.config';
import { RestaurantController } from './restaurant/restaurant.controller';

@Module({
    imports: [
        ConfigModule.forFeature(generalConfig),
        DatabaseModule,
        RestaurantModule,
        CommentsModule,
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
