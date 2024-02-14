import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ConfigModule } from '@nestjs/config';
import generalConfig from '@config/src/general.config';
import {
    CommentLikeDBService,
    CommentsDBService,
    PrismaServicePGDB
} from '@database';

@Module({
    imports: [ConfigModule.forFeature(generalConfig)],
    providers: [
        EventsGateway,
        CommentsDBService,
        PrismaServicePGDB,
        CommentLikeDBService
    ]
})
export class EventsModule {}
