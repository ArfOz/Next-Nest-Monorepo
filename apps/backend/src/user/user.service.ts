import { AuthService } from '@auth';
import { UsersDBService } from '@database';
import { Injectable } from '@nestjs/common';
import { UserRegisterJson } from './dtos';
import * as bcrypt from 'bcrypt';
import {
    UnauthorizedException,
    UnauthorizedExceptionType,
    UserExceptionType
} from '@exceptions';
import { ResponseController } from '@dtos';

@Injectable()
export class UserService {
    constructor(
        private readonly authService: AuthService,
        private readonly userDbService: UsersDBService
    ) {}

    async Register(data: UserRegisterJson): Promise<ResponseController> {
        if (data.password.length < 8) {
            throw new UnauthorizedException(
                UserExceptionType.PASSWORD_TOO_SHORT,
                new Error('PASSWORD_TOO_SHORT'),
                404
            );
        }

        const user = await this.userDbService.findOne({ email: data.email });

        if (user) {
            throw new UnauthorizedException(
                UserExceptionType.USER_ALREADY_EXIST,
                new Error('USER_ALREADY_EXIST'),
                404
            );
        }

        const hashPass = await bcrypt.hash(data.password, 10);
        data = { ...data, password: hashPass };

        const response = await this.userDbService.Create(data);

        return {
            Success: true,
            Data: response
        };
    }
    async Signin(email, password): Promise<ResponseController> {
        const user = await this.userDbService.findOne({ email });
        if (!user) {
            throw new UnauthorizedException(
                UnauthorizedExceptionType.USER_NOT_REGISTERED,
                new Error('THERE IS NO USER.'),
                404
            );
        }

        const response = await this.authService.SignIn(user, password);

        return {
            Success: true,
            Data: response
        };
    }
}
