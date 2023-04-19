import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ProjectsCreateInput, ProjectsCreateOutput } from 'shared-workers';
import { ProjectsCreate } from '@domains/Projects/application/ProjectsCreate';
import { ProjectsGetByUserId } from '@domains/Projects/application/ProjectsGetByUserId';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectPinoLogger(ProjectsService.name)
    private readonly logger: PinoLogger,
    private readonly projectsCreate: ProjectsCreate,
    private readonly projectsGetByUserId: ProjectsGetByUserId,
  ) {}

  public async create(
    input: ProjectsCreateInput,
  ): Promise<ProjectsCreateOutput> {
    return this.projectsCreate.invoke(input);
  }

  public async myself(_id: string) {
    return this.projectsGetByUserId.invoke({ _id });
  }
}
