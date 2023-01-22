import { Injectable, ValidationError } from '@nestjs/common';

import { AyobaHttpException } from '../ayoba-http-exception';

import { AbstractErrorParser } from './abstract-error-parser';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class ClassValidatorErrorParser implements AbstractErrorParser {
  name = 'ClassValidatorErrorParser';

  constructor(
    @InjectPinoLogger(ClassValidatorErrorParser.name)
    private readonly logger: PinoLogger,
  ) {}

  test(exception: any): boolean {
    return exception?.response?.error === 'Bad Request';
  }

  create(exception: any): AyobaHttpException {
    this.logger.error(this.name, { exception });
    const validationErrors: ValidationError[] = exception.response.message;
    return {
      statusCode: 400,
      status: 'validation_error',
      message: 'Check validation to see errors',
      validation: validationErrors,
    };
  }
}
