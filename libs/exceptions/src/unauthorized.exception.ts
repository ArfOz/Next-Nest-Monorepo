import { HttpStatus } from '@nestjs/common';
import { UnauthorizedExceptionType } from './unauthorized.enum.type';
import { GeneralException } from './general.exception';

export class UnauthorizedException extends GeneralException {
  constructor(
    // eslint-disable-next-line default-param-last
    type: UnauthorizedExceptionType = UnauthorizedExceptionType.UNAUTHORIZED_ACCESS,
    error: Error,
    code: number
  ) {
    const status = HttpStatus.UNAUTHORIZED;
    super(type, error, code, status);
  }
}
