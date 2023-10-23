import { UsersDBService } from '@database';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersDBService,
        private jwtService: JwtService
    ) {}

    async SignIn(username: string, pass: string) {
        const user = await this.usersService.findOne({ username });
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
