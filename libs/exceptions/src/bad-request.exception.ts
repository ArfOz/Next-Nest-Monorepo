import { HttpStatus } from '@nestjs/common';
import { GeneralException } from './general.exception';
import { BadRequestExceptionType } from './exception.enum.type';

export class BadRequestException extends GeneralException {
    constructor(
        // eslint-disable-next-line default-param-last
        type: keyof typeof BadRequestExceptionType,
        // error?: Error,
        error: Error,
        code: number
    ) {
        const status = HttpStatus.BAD_REQUEST;
        super(type, error, code, status);
    }
}
