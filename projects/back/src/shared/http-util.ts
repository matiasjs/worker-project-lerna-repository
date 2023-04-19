import { IncomingHttpHeaders } from 'http';

import { Request, Response } from 'express';
import * as short from 'short-uuid';

export const fromHttpRequest = (
  request: Request & { user: any },
): {
  authorization: string;
  method: string;
  endpoint: string;
  url: string;
  query: unknown;
  body: unknown;
  username: string;
  requestId: string;
  ip: string;
  headers: IncomingHttpHeaders;
} => {
  return {
    authorization: request.headers.authorization,
    method: request.method,
    endpoint: request.route?.path,
    url: request.url,
    query: request.query,
    body: request.body,
    username: request.user?.username || 'anon',
    requestId: request.header('X-Request-ID') || short.generate(),
    ip: request.ip,
    headers: request.headers,
  };
};

export const fromHttpResponse = (
  response: Response,
): { statusCode: number } => {
  return {
    statusCode: response.statusCode,
  };
};
