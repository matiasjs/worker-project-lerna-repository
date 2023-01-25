import { Rol } from './Rol';
import { Nullable } from 'shared-workers';

export abstract class RolesRepository {
  abstract getAll(): Promise<Nullable<Rol[]>>;
}
