import { Injectable } from '@nestjs/common/decorators';
import { ProjectsRepository } from '../domain/ProjectRepository';
import { Project } from '../domain/Project';
import { ProjectsCreateResponse } from '@domains/Shared/application/responses/ProjectsCreateResponse';
import { Address } from 'shared-workers';

interface Params {
  name: string;
  address: Address;
  description: string;
  ownerId: string;
  workers?: any[];
}

@Injectable()
export class ProjectsCreate {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async invoke(params: Params): Promise<ProjectsCreateResponse> {
    let project = Project.fromPrimitives(params);

    project = await this.projectsRepository.create(project);

    const primitive = project.toPrimitives();

    return {
      ...primitive,
      _id: primitive._id,
      workers: primitive.workers,
    };
  }
}
