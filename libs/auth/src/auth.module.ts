import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDBModule } from '@database';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'process';

@Module({
    imports: [
        UsersDBModule,
        JwtModule.register({
            global: true,
            secret: process.env['JWT_SECRET_KEY'],
            signOptions: { expiresIn: '60s' }
        })
    ],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
