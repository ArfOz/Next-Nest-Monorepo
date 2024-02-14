import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ConfigModule } from '@nestjs/config';
import generalConfig from '@config/src/general.config';
import { WsGuard } from './ws.guard';

@Module({
    imports: [ConfigModule.forFeature(generalConfig)],
    providers: [AuthGuard, WsGuard],
    exports: [AuthGuard, WsGuard]
})
export class GuardModule {}
