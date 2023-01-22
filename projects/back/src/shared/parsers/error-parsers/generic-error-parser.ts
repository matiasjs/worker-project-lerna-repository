import { HttpStatus, Injectable } from '@nestjs/common';

import { AyobaHttpException } from '../ayoba-http-exception';

import { AbstractErrorParser } from './abstract-error-parser';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { isProduction, statusTextFromCode } from '../../../shared/utils/util';

@Injectable()
export class GenericErrorParser implements AbstractErrorParser {
  name = 'GenericErrorParser';

  constructor(
    @InjectPinoLogger(GenericErrorParser.name)
    private readonly logger: PinoLogger,
  ) {}

  test(exception: any): boolean {
    return true;
  }

  create(exception: any): AyobaHttpException {
    if (!isProduction) {
      console.error(exception);
    }

    if (exception.response) {
      exception = exception.response;
    }

    if (
      exception?.error &&
      typeof exception.error === 'object' &&
      exception.error.message
    ) {
      exception = exception.error;
    }

    const statusCode = exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const status = exception.status || statusTextFromCode(statusCode);
    const message = exception.message
      ? exception.message.error
        ? exception.message.error
        : exception.message
      : exception.message;
    const extra = exception.extra || {};

    return {
      statusCode,
      status,
      message: message || 'Unexpected error',
      ...extra,
    };
  }
}
