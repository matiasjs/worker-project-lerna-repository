import { Injectable } from '@nestjs/common/decorators';

import { Nullable } from 'shared-workers';
import { MongodbRepository } from '../../Shared/infrastructure/MongodbRepository';
import { MongodbConfig } from '@domains/Shared/infrastructure/MongodbConfig';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ObjectId } from 'mongodb';
import { ProjectsRepository } from '../domain/ProjectRepository';
import { Project } from '../domain/Project';

@Injectable()
export class ProjectsRepositoryMongodb
  extends MongodbRepository
  implements ProjectsRepository
{
  constructor(
    @InjectPinoLogger(ProjectsRepositoryMongodb.name)
    protected readonly logger: PinoLogger,
    config: MongodbConfig,
  ) {
    super(logger, config);
  }

  async create(project: Project): Promise<Project> {
    const { insertedId } = await this.collection.insertOne(
      project.toPrimitives(),
    );

    return Project.fromPrimitives({
      _id: insertedId,
      ...project,
    });
  }
}
