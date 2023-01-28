import { Injectable } from '@nestjs/common';

import { AyobaHttpException } from './ayoba-http-exception';
import { AbstractErrorParser } from './error-parsers/abstract-error-parser';
import { ClassValidatorErrorParser } from './error-parsers/class-validator-error-parser';
import { DomainErrorParser } from './error-parsers/domain-error-parser';
import { ForbiddenErrorParser } from './error-parsers/forbidden-error-parser';
import { GenericErrorParser } from './error-parsers/generic-error-parser';
import { HttpErrorParser } from './error-parsers/http-error-parser';
import { TimeoutErrorParser } from './error-parsers/timeout-error-parser';

@Injectable()
export class CommonErrorParser {
  private exceptionParsers: AbstractErrorParser[];

  constructor(
    domainErrorParser: DomainErrorParser,
    classValidatorErrorParser: ClassValidatorErrorParser,
    forbiddenErrorParser: ForbiddenErrorParser,
    httpErrorParser: HttpErrorParser,
    timeoutErrorParser: TimeoutErrorParser,
    genericErrorParser: GenericErrorParser,
  ) {
    this.exceptionParsers = [
      domainErrorParser,
      classValidatorErrorParser,
      forbiddenErrorParser,
      httpErrorParser,
      timeoutErrorParser,
      genericErrorParser,
    ];
  }

  parse(exception): AyobaHttpException {
    const exceptionParser = this.exceptionParsers.find((parser) =>
      parser.test(exception),
    );

    if (
      exception &&
      typeof exception.statusCode === 'number' &&
      typeof exception.status === 'string' &&
      typeof exception.message === 'string'
    ) {
      // Already parsed
      return exception;
    }

    try {
      return exceptionParser.create(exception);
    } catch (_error) {
      return {
        statusCode: 500,
        status: 'ERROR',
        message: 'Unexpected error when parsing exception',
      };
    }
  }
}
