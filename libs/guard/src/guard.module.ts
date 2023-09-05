import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ConfigModule } from '@nestjs/config';
import generalConfig from '@config/src/general.config';

@Module({
  imports: [ConfigModule.forFeature(generalConfig)],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class GuardModule {}
