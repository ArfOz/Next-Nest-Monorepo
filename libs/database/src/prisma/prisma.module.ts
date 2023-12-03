import { Module } from '@nestjs/common';
import { PrismaServiceMongoDB } from './prisma.mongodb/prisma.mongodb.service';
import { PrismaServicePGDB } from './prisma.postgresql/prisma.pgdb.service';

@Module({
    imports: [],
    exports: [PrismaServiceMongoDB, PrismaServicePGDB],
    providers: [PrismaServiceMongoDB, PrismaServicePGDB]
})
export class PrismaModule {}
