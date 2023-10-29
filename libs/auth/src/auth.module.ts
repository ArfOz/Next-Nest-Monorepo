import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDBModule } from '@database';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'process';
import generalConfig from '@config/src/general.config';

@Module({
    imports: [
        UsersDBModule,
        ConfigModule.forFeature(generalConfig),
        JwtModule.register({
            global: true,
            secret: process.env['JWT_SECRET_KEY'],
            signOptions: { expiresIn: '10d' }
        })
    ],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
