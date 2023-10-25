import { HttpStatus } from '@nestjs/common';
import { GeneralException } from './general.exception';
import { ForbiddenExceptionType } from './unauthorized.enum.type';

export class ForbiddenException extends GeneralException {
    constructor(
        // eslint-disable-next-line default-param-last
        type: ForbiddenExceptionType = ForbiddenExceptionType.FORBIDDEN,
        error: Error,
        code: number
    ) {
        const status = HttpStatus.FORBIDDEN;
        super(type, error, code, status);
    }
}
