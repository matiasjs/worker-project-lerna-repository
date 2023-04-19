import { Injectable } from '@nestjs/common';

import { AyobaHttpException } from '../ayoba-http-exception';

import { AbstractErrorParser } from './abstract-error-parser';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class TimeoutErrorParser implements AbstractErrorParser {
  name = 'TimeoutErrorParser';

  constructor(
    @InjectPinoLogger(TimeoutErrorParser.name)
    private readonly logger: PinoLogger,
  ) {}

  test(exception: any): boolean {
    return exception?.name === 'TimeoutError';
  }

  create(exception: any): AyobaHttpException {
    this.logger.error(this.name, { exception });

    return {
      statusCode: 408,
      status: 'TIMEOUT',
      message: 'Request Timeout',
    };
  }
}
