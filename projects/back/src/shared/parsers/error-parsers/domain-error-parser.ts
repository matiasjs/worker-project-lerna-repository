import { Injectable } from '@nestjs/common';

import { AyobaHttpException } from '../ayoba-http-exception';

import { AbstractErrorParser } from './abstract-error-parser';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DomainError } from 'shared-workers';

@Injectable()
export class DomainErrorParser implements AbstractErrorParser {
  name = 'DomainErrorParser';

  constructor(
    @InjectPinoLogger(DomainErrorParser.name)
    private readonly logger: PinoLogger,
  ) {}

  test(exception: DomainError | unknown): boolean {
    return (exception as DomainError)?.parserType === 'DomainError';
  }

  create(exception: DomainError): AyobaHttpException {
    this.logger.error(this.name, { exception });

    const extra = exception.extra ? exception.extra : {};

    return {
      ...extra,
      statusCode: this.statusCodeFromErrorCode(exception.errorCode),
      status: exception.errorCode,
      message: exception.message,
    };
  }

  private statusCodeFromErrorCode(errorCode: string): number {
    if (!!errorCode.match(/invalid_argument$/)) {
      return 400;
    }
    if (!!errorCode.match(/invalid_credentials$/)) {
      return 401;
    }
    if (!!errorCode.match(/not_found$/)) {
      return 404;
    }
    if (!!errorCode.match(/not_initialized$/)) {
      return 424;
    }
    if (!!errorCode.match(/already_exists$/)) {
      return 440;
    }
    if (!!errorCode.match(/not_supported$/)) {
      return 455;
    }
    if (!!errorCode.match(/not_registered$/)) {
      return 456;
    }
    return 500;
  }
}
