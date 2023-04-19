import { Injectable } from '@nestjs/common/decorators';
import { RolesRepository } from '../domain/RolRepository';
import { RolesGetAllResponse } from '@domains/Shared/application/responses/RolesGetAllResponse';

@Injectable()
export class RolesCreate {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async invoke(): Promise<RolesGetAllResponse> {
    return undefined;
  }
}
