import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { RolesGetAllOutput } from 'shared-workers';
import { RolesGetAll } from '@domains/roles/application/RolesGetAll';
import { RedisRepository } from '@domains/Shared/infrastructure/RedisRepository';
import { RolesGetAllResponse } from '@domains/Shared/application/RolesGetAllResponse';
import { RolesCreate } from '@domains/roles/application/RolesCreate';

@Injectable()
export class RolesService {
  // TODO: move to var envs
  private redisKeyRoles = 'redisKeyRoles';

  constructor(
    @InjectPinoLogger(RolesService.name)
    private readonly logger: PinoLogger,
    private readonly rolesGetAll: RolesGetAll,
    private readonly rolesCreate: RolesCreate,
    private readonly redisRepository: RedisRepository,
  ) {
    // TODO cache callback for roles
  }

  public async getAll(): Promise<RolesGetAllOutput> {
    const cachedRoles = await this.getFromCache();

    if (cachedRoles) {
      return cachedRoles;
    }

    const roles = await this.rolesGetAll.invoke();

    this.saveOnCache(roles).catch((error) => this.logger.error(error));

    return roles.map(({ _id, description }) => ({
      _id,
      description,
    }));
  }

  public async createRol(): Promise<any> {
    const rol = await this.rolesCreate.invoke();

    this.deleteFromCache();

    return {
      _id: rol._id,
      description: rol.description,
    };
  }

  private async getFromCache(): Promise<RolesGetAllOutput> {
    return this.redisRepository.get<RolesGetAllOutput>(this.redisKeyRoles);
  }

  private async saveOnCache(roles: RolesGetAllResponse[]): Promise<void> {
    return this.redisRepository.set(this.redisKeyRoles, roles, 1000);
  }

  private async deleteFromCache(): Promise<void> {
    return this.redisRepository.del(this.redisKeyRoles);
  }
}
