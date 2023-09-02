import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongoDb from '../config/config';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [ConfigModule.forFeature(mongoDb)],
})
export class DatabaseModule {}
