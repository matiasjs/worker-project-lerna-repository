import { Specialization } from './Specialization';
import { Nullable } from 'shared-workers';

export abstract class SpecializationsRepository {
  abstract getAll(): Promise<Nullable<Specialization[]>>;
}
