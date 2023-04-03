import { Rol } from "./Rol";

export abstract class RolRepository {
  abstract getAll(): Promise<Rol[]>;
}
