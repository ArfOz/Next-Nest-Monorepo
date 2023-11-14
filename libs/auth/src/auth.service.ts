import { ConfigType } from '@nestjs/config';
import { UsersDBService } from '@database';
import { UnauthorizedException, UnauthorizedExceptionType } from '@exceptions';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import generalConfig from '@config/src/general.config';

@Injectable()
export class AuthService {
    constructor(
        @Inject(generalConfig.KEY)
        private readonly generalCfg: ConfigType<typeof generalConfig>,
        private usersService: UsersDBService,
        private jwtService: JwtService
    ) {}

    async SignIn(user: any, pass: string) {
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

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: `${this.generalCfg.jwt_access_expired!}d`
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: `${this.generalCfg.jwt_refresh_expired!}d`
            })
        ]);

        const expiresAccessToken = new Date(
            Date.now() +
                parseInt(this.generalCfg.jwt_access_expired, 10) * 60 * 1000
        ).getTime();

        const expiresRefreshToken = new Date(
            Date.now() +
                parseInt(this.generalCfg.jwt_refresh_expired, 10) *
                    3600 *
                    1000 *
                    24
        ).getTime();

        return {
            accessToken,
            refreshToken,
            expiresAccessToken,
            expiresRefreshToken,
            user: {
                username: user.username,
                email: user.email
            }
        };
    }
}
