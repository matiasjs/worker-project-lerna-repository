import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ProjectsCreateInput, ProjectsCreateOutput } from 'shared-workers';
import { ProjectsCreate } from '@domains/Projects/application/ProjectsCreate';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectPinoLogger(ProjectsService.name)
    private readonly logger: PinoLogger,
    private readonly projectsCreate: ProjectsCreate,
  ) {}

  public async create(
    input: ProjectsCreateInput,
  ): Promise<ProjectsCreateOutput> {
    return this.projectsCreate.invoke(input);
  }
}
