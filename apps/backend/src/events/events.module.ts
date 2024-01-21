import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ConfigModule } from '@nestjs/config';
import generalConfig from '@config/src/general.config';

@Module({
    imports: [ConfigModule.forFeature(generalConfig)],
    providers: [EventsGateway]
})
export class EventsModule {}
