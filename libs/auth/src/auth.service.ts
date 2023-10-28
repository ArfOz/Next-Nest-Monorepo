import { UsersDBService } from '@database';
import { UnauthorizedException, UnauthorizedExceptionType } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersDBService,
        private jwtService: JwtService
    ) {}

    async SignIn(email: string, pass: string) {
        const user = await this.usersService.findOne({ email });
        if (!user) {
            throw new UnauthorizedException(
                UnauthorizedExceptionType.USER_NOT_REGISTERED,
                new Error('THERE IS NO USER.'),
                404
            );
        }
        const isMatch = await bcrypt.compare(pass, user?.password);

        if (!isMatch) {
            throw new UnauthorizedException(
                UnauthorizedExceptionType.WRONG_PASSWORD,
                new Error('PASSWORD OR EMAIL IS INCORRECT'),
                404
            );
        }

        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email
        };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
