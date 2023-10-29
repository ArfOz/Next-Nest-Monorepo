import { AuthService } from '@auth';
import { UsersDBService } from '@database';
import { Injectable } from '@nestjs/common';
import { UserRegisterJson } from './dtos';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, UnauthorizedExceptionType } from '@exceptions';

@Injectable()
export class UserService {
    constructor(
        private readonly authService: AuthService,
        private readonly userDbService: UsersDBService
    ) {}

    async Register(data: UserRegisterJson) {
        const hashPass = await bcrypt.hash(data.password, 10);
        data = { ...data, password: hashPass };

        return await this.userDbService.Create(data);
    }
    async Signin(email, password) {
        const user = await this.userDbService.findOne({ email });
        if (!user) {
            throw new UnauthorizedException(
                UnauthorizedExceptionType.USER_NOT_REGISTERED,
                new Error('THERE IS NO USER.'),
                404
            );
        }
        return await this.authService.SignIn(user, password);
    }
}
