import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { RolesGetAllResponse } from '@domains/Shared/application/responses/RolesGetAllResponse';
import { RedisRepository } from '@domains/Shared/infrastructure/RedisRepository';
import { SpecializationsGetAll } from '@domains/Specializations/application/SpecializationsGetAll';
import { SpecializationsGetAllOutput } from 'shared-workers';

@Injectable()
export class GuildsService {
  // TODO: move to var envs
  private redisKeyRoles = 'redisKeySpecializations';

  constructor(
    @InjectPinoLogger(GuildsService.name)
    private readonly logger: PinoLogger,
    private readonly specializationsGetAll: SpecializationsGetAll,
    private readonly redisRepository: RedisRepository,
  ) {
    // TODO cache callback for roles
  }

  public async getAll(): Promise<SpecializationsGetAllOutput> {
    const cachedRoles = await this.getFromCache();

    if (cachedRoles) {
      return cachedRoles;
    }

    const roles = await this.specializationsGetAll.invoke();

    this.saveOnCache(roles).catch((error) => this.logger.error(error));

    return roles.map(({ _id, description }) => ({
      _id,
      description,
    }));
  }

  private async getFromCache(): Promise<SpecializationsGetAllOutput> {
    return this.redisRepository.get<SpecializationsGetAllOutput>(
      this.redisKeyRoles,
    );
  }

  private async saveOnCache(roles: RolesGetAllResponse[]): Promise<void> {
    return this.redisRepository.set(this.redisKeyRoles, roles, 1000);
  }

  private async deleteFromCache(): Promise<void> {
    return this.redisRepository.del(this.redisKeyRoles);
  }
}
