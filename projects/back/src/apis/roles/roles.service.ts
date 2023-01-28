import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { RolesGetAllOutput, UserGetByEmailOutput } from 'shared-workers';
import { RolesGetAll } from '@domains/roles/application/RolesGetAll';

@Injectable()
export class RolesService {
  constructor(
    @InjectPinoLogger(RolesService.name)
    private readonly logger: PinoLogger,
    private readonly rolesGetAll: RolesGetAll,
  ) {
    // TODO cache callback for roles
  }

  public async getAll(): Promise<RolesGetAllOutput> {
    const roles = await this.rolesGetAll.invoke();

    return roles.map(({ _id, description }) => ({
      _id,
      description,
    }));
  }
}
