import { RolRepository } from "../domain/RolRepository";
import { Rol } from "../domain/Rol";
import { RequestRepository } from "../../Shared/domain/RequestRepository";

export class RolAxiosRepository implements RolRepository {
  constructor(private readonly axiosInstace: RequestRepository) {}

  async getAll(): Promise<Rol[]> {
    const roles = await this.axiosInstace
      .get("v1/roles")
      .then((response) => response.data);

    return roles.map((rol) => Rol.fromPrimitives(rol));
  }
}
