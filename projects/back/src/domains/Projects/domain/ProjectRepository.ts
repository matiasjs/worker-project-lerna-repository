import { Project } from './Project';
import { Nullable } from 'shared-workers';

export abstract class ProjectsRepository {
  abstract create(project: Project): Promise<Nullable<Project>>;
}
