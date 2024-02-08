import { ArgumentsHost, Catch, HostParam } from '@nestjs/common';
import { AllExceptionsSocketFilter } from './general.ws.exception';

@Catch()
export class BadRequestExceptionWS extends AllExceptionsSocketFilter {
    constructor(
        // type = 'asdasd',
        // error?: Error,
        error: string,
        host: ArgumentsHost
    ) {
        console.log('bad request ici ', error, host);
        // super.catch(error, host);
        super(error, host);
    }
}
