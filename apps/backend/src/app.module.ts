import { Module } from '@nestjs/common';

import { RestaurantModule } from './restaurant/restaurant.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from '@database';
import { AuthGuard } from '@guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import generalConfig from '@config/src/general.config';

@Module({
    imports: [
        ConfigModule.forFeature(generalConfig),
        DatabaseModule,
        RestaurantModule,
        CommentsModule,
        UserModule
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
