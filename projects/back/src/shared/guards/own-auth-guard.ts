import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OwnAuthGuard extends AuthGuard(['Bearer', 'Basic']) {
  handleRequest<LoggedUser>(error: any, user: LoggedUser): LoggedUser {
    if (error) {
      throw error;
    }
    if (!user) {
      throw new HttpException(
        'No valid token has been provided.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
