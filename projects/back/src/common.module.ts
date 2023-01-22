import { Global, Logger, Module } from '@nestjs/common';

import { CommonErrorParser } from './shared/parsers/error.parser';
import { ClassValidatorErrorParser } from './shared/parsers/error-parsers/class-validator-error-parser';
import { DomainErrorParser } from './shared/parsers/error-parsers/domain-error-parser';
import { ForbiddenErrorParser } from './shared/parsers/error-parsers/forbidden-error-parser';
import { GenericErrorParser } from './shared/parsers/error-parsers/generic-error-parser';
import { HttpErrorParser } from './shared/parsers/error-parsers/http-error-parser';
import { TimeoutErrorParser } from './shared/parsers/error-parsers/timeout-error-parser';

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
export class CommonModule {}
