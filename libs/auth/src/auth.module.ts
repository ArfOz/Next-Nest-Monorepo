import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersDBModule } from '@database';
// import { jwtConstants } from './constants';

@Module({
    imports: [UsersDBModule],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
