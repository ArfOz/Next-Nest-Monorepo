import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthGuard } from '@guard';

@Module({
    providers: [EventsGateway]
})
export class EventsModule {}
