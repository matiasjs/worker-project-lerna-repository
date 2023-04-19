import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RolesEnum } from 'shared-workers';

export const AllowRoles = (...roles: RolesEnum[]): CustomDecorator =>
  SetMetadata('roles', roles);
