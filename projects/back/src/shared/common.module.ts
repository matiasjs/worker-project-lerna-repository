import { Global, Logger, Module } from '@nestjs/common';

import { CommonErrorParser } from './parsers/error.parser';
import { ClassValidatorErrorParser } from './parsers/error-parsers/class-validator-error-parser';
import { DomainErrorParser } from './parsers/error-parsers/domain-error-parser';
import { ForbiddenErrorParser } from './parsers/error-parsers/forbidden-error-parser';
import { GenericErrorParser } from './parsers/error-parsers/generic-error-parser';
import { HttpErrorParser } from './parsers/error-parsers/http-error-parser';
import { TimeoutErrorParser } from './parsers/error-parsers/timeout-error-parser';

@Global()
@Module({
  providers: [
    // Common providers
    CommonErrorParser,
    ClassValidatorErrorParser,
    DomainErrorParser,
    ForbiddenErrorParser,
    GenericErrorParser,
    HttpErrorParser,
    TimeoutErrorParser,
  ],
  exports: [CommonErrorParser],
})
export class SharedModule {}
