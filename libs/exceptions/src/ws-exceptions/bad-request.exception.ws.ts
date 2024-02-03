import { ArgumentsHost, Catch, HostParam } from '@nestjs/common';
import { AllExceptionsSocketFilter } from './general.ws.exception';

@Catch()
export class BadRequestExceptionWS extends AllExceptionsSocketFilter {
    constructor(
        // type = 'asdasd',
        // error?: Error,
        error: Error,
        host: ArgumentsHost
    ) {
        super();
        super.catch(error, host);
    }
}
