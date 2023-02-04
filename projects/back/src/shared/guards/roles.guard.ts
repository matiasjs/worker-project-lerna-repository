import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum, RolesWhiteList } from 'shared-workers';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const allowedRoles = this.reflector.get<RolesEnum[]>(
      'roles',
      context.getHandler(),
    );
    const user = request.user;
    const userRol = user?.rol?.description;

    if (!user && !allowedRoles) {
      return true;
    } else if (!user) {
      // User cannot belong to a rol if not exists
      return false;
    }

    if (!allowedRoles && RolesWhiteList.includes(userRol)) {
      // If no group is defined then all white-listed are allowed
      return true;
    }

    if (userRol === RolesEnum.admin) {
      // Allow everything to admins
      return true;
    }

    if (!allowedRoles || !allowedRoles.includes(userRol)) {
      // Testers have an exclusive user
      throw new ForbiddenException(`Forbidden access for the rol <${userRol}>`);
    }

    return true;
  }
}
