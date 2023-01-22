import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { fromHttpRequest } from '../http-util';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommonErrorParser } from '../parsers/error.parser';

@Catch()
export class CommonHttpExceptionFilter extends BaseExceptionFilter {
  constructor(
    @InjectPinoLogger(CommonHttpExceptionFilter.name)
    private readonly logger: PinoLogger,
    private readonly exceptionParser: CommonErrorParser,
  ) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    try {
      const parsedException = this.exceptionParser.parse(exception);

      const ctx = host.switchToHttp();
      const { method, endpoint } = fromHttpRequest(ctx.getRequest());
      const response = ctx.getResponse();

      this.logger.error(
        `HTTP [${method}] ${endpoint} ${parsedException.statusCode}`,
        // TODO: review this statement
        true ? { exception: parsedException } : null,
      );

      return response.status(parsedException.statusCode).json({
        ...parsedException,
        requestId: undefined,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return host
        .switchToHttp()
        .getResponse()
        .status(500)
        .json({ message: 'CommonHttpExceptionFilter unexpected error' });
    }
  }
}
