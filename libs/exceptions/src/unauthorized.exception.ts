import { HttpStatus } from '@nestjs/common';
import {
    UnauthorizedExceptionType,
    UserExceptionType
} from './exception.enum.type';
import { GeneralException } from './general.exception';

export class UnauthorizedException extends GeneralException {
    constructor(
        // eslint-disable-next-line default-param-last
        type: UnauthorizedExceptionType | UserExceptionType,
        error: Error,
        code: number
    ) {
        const status = HttpStatus.UNAUTHORIZED;
        super(type, error, code, status);
    }
}
