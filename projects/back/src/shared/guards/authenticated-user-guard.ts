import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AuthenticatedUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request?.user?._id) {
      throw new ForbiddenException('Forbidden for non ayoba users');
    }

    return true;
  }
}
