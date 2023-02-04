import { Injectable } from '@nestjs/common/decorators';
import { RolesRepository } from '../domain/RolRepository';
import { RolesGetAllResponse } from '@domains/Shared/application/responses/RolesGetAllResponse';

@Injectable()
export class RolesGetAll {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async invoke(): Promise<RolesGetAllResponse[]> {
    let users = await this.rolesRepository.getAll();

    if (!users?.length) {
      throw new Error('Many users');
    }

    const responses = users.map((user) => user.toPrimitives());

    return responses;
  }
}
