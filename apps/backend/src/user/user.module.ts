import { AuthModule } from '@auth';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersDBModule } from '@database';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [AuthModule, UsersDBModule]
})
export class UserModule {}
