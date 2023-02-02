import { Injectable } from '@nestjs/common/decorators';
import { SpecializationsRepository } from '../domain/SpecializationRepository';
import { RolesGetAllResponse } from '@domains/Shared/application/responses/RolesGetAllResponse';

@Injectable()
export class SpecializationsGetAll {
  constructor(private readonly rolesRepository: SpecializationsRepository) {}

  async invoke(): Promise<RolesGetAllResponse[]> {
    let users = await this.rolesRepository.getAll();

    if (!users?.length) {
      throw new Error('Many users');
    }

    const responses = users.map((user) => user.toPrimitives());

    return responses;
  }
}
