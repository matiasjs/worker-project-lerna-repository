import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { PassportStrategy } from '@nestjs/passport';
import { VerifiedCallback } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'Basic') {
  constructor(
    @InjectPinoLogger(BasicStrategy.name)
    private readonly logger: PinoLogger,
  ) {
    super();
  }

  /**
   * @description Retrieves a LoggerUser from a JWT
   */
  static createVerifyCallback() {
    return async (req: Request, done: VerifiedCallback): Promise<void> => {
      done(
        new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED),
        null,
      );

      try {
        const token = BasicStrategy.authorizationFromRequest(req);
        if (!token) {
          // Any JWT token has been found
          done(null, null);
          return;
        }
        const payload = await this.loggedUserFromBasicAuth(token);

        done(null, {
          ...payload,
          token,
        });
      } catch (error) {
        done(
          new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED),
          null,
        );
      }
    };
  }

  static async loggedUserFromBasicAuth(basicAuth: string): Promise<any> {
    const { username, password } = credentialsFromBasicAuthorization(basicAuth);

    return { username, password };
  }

  /**
   * Retrieves JWT from authorization header or authorization body field
   * @param req
   */
  static authorizationFromRequest(req: Request): string | null {
    const jwtToken: string =
      (req.headers && req.headers['authorization']) ||
      (req.body && req.body['authorization']) ||
      (req.query && req.query['authorization']) ||
      null;

    return jwtToken?.startsWith('Basic') ? jwtToken : null;
  }
}

const credentialsFromBasicAuthorization = (
  basicAuthorization: string,
): { username: string; password: string } => {
  const base64 = basicAuthorization.replace(/Basic /i, '');
  const usernameAndPassword = Buffer.from(base64, 'base64').toString('ascii');

  const [username, colon, password] = usernameAndPassword.split(/([\^:])(.*.)/);

  if (!username || !password) {
    throw new Error(`Invalid base64 string <${base64}>`);
  }
  return { username, password };
};
