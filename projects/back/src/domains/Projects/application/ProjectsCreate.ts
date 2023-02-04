import { Injectable } from '@nestjs/common/decorators';
import { ProjectsRepository } from '../domain/ProjectRepository';
import { Project } from '../domain/Project';
import { ProjectsCreateResponse } from '@domains/Shared/application/responses/ProjectsCreateResponse';

interface Params {
  description: string;
}

@Injectable()
export class ProjectsCreate {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async invoke(params: Params): Promise<ProjectsCreateResponse> {
    let project = Project.fromPrimitives(params);

    project = await this.projectsRepository.create(project);

    return project;
  }
}
