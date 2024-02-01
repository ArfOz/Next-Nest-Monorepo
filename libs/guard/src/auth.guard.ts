import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IncomingHttpHeaders } from 'http';
import { UnauthorizedException, UnauthorizedExceptionType } from '@exceptions';
import { isDefined } from 'class-validator';
import { ConfigType } from '@nestjs/config';
import generalConfig from '@config/src/general.config';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(generalConfig.KEY)
        private generalCfg: ConfigType<typeof generalConfig>,
        private reflector: Reflector,
        private jwtService: JwtService
    ) {}
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        let ctx = null;
        let req = null;

        const ctxType = context.getType() as string;

        switch (ctxType) {
            case 'http':
                ctx = context.switchToHttp();
                req = ctx.getRequest();
                break;
            default:
                return false;
            // throw new ForbiddenException(
            //   ForbiddenExceptionType.FORBIDDEN,
            //   new Error('Yetkisiz Giriş'),
            //   500
            // );
        }
        const staticTokenRequired = this.reflector.get<boolean>(
            'staticTokenRequired',
            context.getHandler()
        );

        const allowUnauthorizedRequest = this.reflector.get<boolean>(
            'allowUnauthorizedRequest',
            context.getHandler()
        );

        return (
            allowUnauthorizedRequest ||
            this.validateRequest(req, staticTokenRequired)
        );
    }

    private async validateRequest(
        req: any,
        staticTokenRequired: boolean
    ): Promise<boolean> {
        const token = this.getBearerToken(
            req.headers ?? req[Symbol('kHeaders')]
        );

        if (staticTokenRequired) {
            req.hasStaticToken = this.generalCfg.static_token === token;
            return req.hasStaticToken;
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.generalCfg.jwt_secret_key
            });
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            req['user'] = payload;
        } catch {
            throw new UnauthorizedException(
                UnauthorizedExceptionType.NO_AUTHORIZATION_TOKEN,
                new Error('Geçersiz Token'),
                500
            );
        }

        return true;
    }

    private getBearerToken(headers: IncomingHttpHeaders) {
        if (this.isNotExistsBearerToken(headers)) {
            throw new UnauthorizedException(
                UnauthorizedExceptionType.NO_AUTHORIZATION_TOKEN,
                new Error('Token yok!'),
                500
            );
        }
        const auth =
            headers['static-token']?.toString() ??
            (headers.authorization?.toString() || ' ');

        return auth.split('Bearer ')[1];
    }

    private isNotExistsBearerToken(headers: IncomingHttpHeaders): boolean {
        const authorization: string =
            headers['static-token']?.toString() ??
            (headers.authorization?.toString() || ' ');

        return (
            !isDefined(authorization) || !authorization.startsWith('Bearer ')
        );
    }
}
