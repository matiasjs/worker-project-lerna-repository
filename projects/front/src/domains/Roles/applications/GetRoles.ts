import { RolesGetAllOutput } from "shared-workers";
import { RolRepository } from "../domain/RolRepository";

export class GetAllRoles {
  constructor(private readonly rolesRepository: RolRepository) {}

  async invoke(): Promise<RolesGetAllOutput> {
    const roles = await this.rolesRepository.getAll();

    return roles.map((rol) => rol.toPrimitives());
  }
}
