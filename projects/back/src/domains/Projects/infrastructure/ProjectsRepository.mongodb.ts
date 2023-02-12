import { Injectable } from '@nestjs/common/decorators';

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

  async getByUserId(_id: string): Promise<Project[]> {
    // TODO: cambiar el aggregate
    const projects = (await this.collection
      .aggregate([
        {
          $match: {
            ownerId: new ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'workersIds',
            foreignField: '_id',
            as: 'workers',
          },
        },
        {
          $unwind: {
            path: '$workers',
          },
        },
      ])
      .toArray()) as any;

    return projects.map(Project.fromPrimitives);
  }

  async create(project: Project): Promise<Project> {
    const { insertedId } = await this.collection.insertOne(
      project.toPrimitivesMongodb(),
    );

    return Project.fromPrimitives({
      ...project,
      _id: insertedId.toString(),
    });
  }
}
