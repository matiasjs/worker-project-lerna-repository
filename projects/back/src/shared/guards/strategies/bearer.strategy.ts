import { Request } from 'express';
import { Strategy, VerifiedCallback } from 'passport-custom';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'Bearer') {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly jwtService: JwtService,
  ) {
    super(BearerStrategy.createVerifyCallback(moduleRef, jwtService));
  }

  /**
   * @description Retrieves a LoggerUser from a JWT
   */
  static createVerifyCallback(moduleRef: ModuleRef, jwtService: JwtService) {
    return async (req: Request, done: VerifiedCallback): Promise<void> => {
      try {
        const token = BearerStrategy.bearerFromRequest(req);
        if (!token) {
          // Any JWT token has been found
          done(null, null);
          return;
        }
        const payload = jwtService.verify(token.replace(/Bearer /i, ''));

        done(null, {
          ...payload,
          token,
        });
      } catch (error) {
        const isExpired = error?.name === 'TokenExpiredError';
        done(
          new HttpException(
            isExpired ? 'Expired Bearer' : 'Invalid Bearer',
            HttpStatus.UNAUTHORIZED,
          ),
          null,
        );
      }
    };
  }

  /**
   * Retrieves JWT from authorization header or authorization body field
   * @param req
   */
  static bearerFromRequest(req: Request): string | null {
    let jwtToken: string =
      (req.headers && req.headers['authorization']) ||
      (req.body && req.body['authorization']) ||
      (req.query && req.query['authorization']) ||
      null;

    if (!jwtToken) {
      return null;
    }

    jwtToken = jwtToken.startsWith('Bearer ') ? jwtToken : `Bearer ${jwtToken}`;

    return jwtToken.match(
      /^(Bearer )?[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
    )
      ? jwtToken
      : null;
  }
}
