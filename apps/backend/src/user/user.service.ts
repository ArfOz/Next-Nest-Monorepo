import { AuthService } from '@auth';
import { UsersDBService } from '@database';
import { Injectable } from '@nestjs/common';
import { UserRegisterJson } from './dtos';
import * as bcrypt from 'bcrypt';

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
    async Signin(username, password) {
        return await this.authService.SignIn(username, password);
    }
}
