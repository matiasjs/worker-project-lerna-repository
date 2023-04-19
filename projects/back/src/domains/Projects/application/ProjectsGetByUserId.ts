import { Injectable } from '@nestjs/common/decorators';
import { ProjectsRepository } from '../domain/ProjectRepository';
import { ProjectsCreateResponse } from '@domains/Shared/application/responses/ProjectsCreateResponse';

interface Params {
  _id: string;
}

@Injectable()
export class ProjectsGetByUserId {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async invoke({ _id }: Params): Promise<ProjectsCreateResponse[]> {
    const projects = await this.projectsRepository.getByUserId(_id);

    return projects.map((project) => ({
      ...project,
      workers: project.workers,
    }));
  }
}
