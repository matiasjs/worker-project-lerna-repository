import { Injectable } from '@nestjs/common';

import { AyobaHttpException } from '../ayoba-http-exception';

import { AbstractErrorParser } from './abstract-error-parser';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class ForbiddenErrorParser implements AbstractErrorParser {
  name = 'ForbiddenErrorParser';

  constructor(
    @InjectPinoLogger(ForbiddenErrorParser.name)
    private readonly logger: PinoLogger,
  ) {}

  test(exception: any): boolean {
    return exception?.status === 403;
  }

  create(exception: any): AyobaHttpException {
    this.logger.error(this.name, { exception });

    return {
      statusCode: 403,
      status: 'forbidden',
      message: exception.response.message || 'Forbidden resource',
    };
  }
}
