import { ArgumentsHost, Catch, HostParam } from '@nestjs/common';
import { AllExceptionsSocketFilter } from './general.ws.exception';
import { Socket } from 'socket.io';

@Catch()
export class BadRequestExceptionWS extends AllExceptionsSocketFilter {
    constructor(error: string, host: Socket) {
        super(error, host);
    }
}
