import { HttpException, Injectable } from '@nestjs/common';

import { AyobaHttpException } from '../ayoba-http-exception';

import { AbstractErrorParser } from './abstract-error-parser';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { statusTextFromCode } from 'src/shared/utils/util';

@Injectable()
export class HttpErrorParser implements AbstractErrorParser {
  name = 'HttpErrorParser';

  constructor(
    @InjectPinoLogger(HttpErrorParser.name)
    private readonly logger: PinoLogger,
  ) {}

  test(exception: unknown): boolean {
    return exception instanceof HttpException;
  }

  create(exception: HttpException): AyobaHttpException {
    this.logger.error(this.name, { exception });

    const response: any = exception.getResponse();
    const extra = response?.extra || {};
    const status =
      response?.status || statusTextFromCode(exception.getStatus());
    return {
      statusCode: exception.getStatus(),
      status,
      message: exception.message,
      ...extra,
    };
  }
}
