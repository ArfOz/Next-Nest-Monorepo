import { HttpException, HttpStatus } from '@nestjs/common';

export class GeneralException extends HttpException {
  error: Error;
  details: Error;
  code: number;
  statusCode?: number;

  constructor(
    message?: string,
    details?: Error,
    code?: number,
    statusCode?: number
  ) {
    statusCode = statusCode || HttpStatus.FORBIDDEN;
    super(
      { Error: message, Details: details?.message, Code: code },
      statusCode
    );
  }
}
