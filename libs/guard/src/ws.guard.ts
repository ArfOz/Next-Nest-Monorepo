import { WsUnauthorizedException } from '@exceptions';
import { CanActivate, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { isDefined } from 'class-validator';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import generalConfig from '@config/src/general.config';

@Injectable()
export class WsGuard implements CanActivate {
    constructor(
        @Inject(generalConfig.KEY)
        private generalCfg: ConfigType<typeof generalConfig>,
        private jwtService: JwtService
    ) {}

    canActivate(
        context: any
    ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
        // for testing support, fallback to token header
        // const token =
        // socket.handshake.auth.token || socket.handshake.headers['token'];
        return this.validateRequest(context, false);
    }

    private async validateRequest(
        req: any,
        staticTokenRequired: boolean
    ): Promise<boolean> {
        const socket = req.switchToWs().getClient();
        const token = this.getBearerToken(socket);
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.generalCfg.jwt_secret_key
            });
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            // req['args']['user'] = payload;
            req.switchToHttp().getRequest().user = payload;
        } catch {
            throw new WsUnauthorizedException('Token yok!');
        }

        return true;
    }

    private getBearerToken(socket: Socket) {
        if (this.isNotExistsBearerToken(socket)) {
            throw new WsUnauthorizedException('Token yok!');
        }
        const auth =
            socket.handshake.auth.token || socket.handshake.headers['token'];

        return auth.split('Bearer ')[1];
    }

    private isNotExistsBearerToken(socket: Socket): boolean {
        const authorization =
            socket.handshake.auth.token || socket.handshake.headers['token'];

        return (
            !isDefined(authorization) || !authorization.startsWith('Bearer ')
        );
    }
}
