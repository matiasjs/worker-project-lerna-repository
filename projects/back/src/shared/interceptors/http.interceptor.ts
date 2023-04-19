import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

import { Observable, map, tap } from 'rxjs';
import { fromHttpRequest, fromHttpResponse } from '../http-util';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

export class CommonHttpInterceptor implements NestInterceptor {
  constructor(
    @InjectPinoLogger(CommonHttpInterceptor.name)
    private readonly logger: PinoLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const initTime = Date.now();
    const http: HttpArgumentsHost = context.switchToHttp();
    const {
      method,
      endpoint,
      url,
      query,
      body,
      username,
      requestId,
      ip,
      headers,
    } = fromHttpRequest(http.getRequest());

    return next.handle().pipe(
      tap(
        (output) => {
          const elapsedTime = Date.now() - initTime;
          const { statusCode } = fromHttpResponse(http.getResponse());
          this.logger.debug(method, endpoint, statusCode, elapsedTime, output);
        },
        (error) => {
          const elapsedTime = Date.now() - initTime;
          this.logger.error(method, endpoint, elapsedTime, error);
        },
      ),
      map((data) => {
        // Change status
        if (data?.statusCode && !isNaN(data.statusCode)) {
          const response = http.getResponse();
          response.status(data.statusCode);
        }
        return data;
      }),
    );
  }
}
