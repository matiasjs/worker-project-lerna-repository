import { Injectable } from '@nestjs/common/decorators';

import { Nullable } from 'shared-workers';
import { MongodbRepository } from '../../Shared/infrastructure/MongodbRepository';
import { MongodbConfig } from '@domains/Shared/infrastructure/MongodbConfig';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ObjectId } from 'mongodb';
import { SpecializationsRepository } from '../domain/SpecializationRepository';
import { Specialization } from '../domain/Specialization';

@Injectable()
export class SpecializationsRepositoryMongodb
  extends MongodbRepository
  implements SpecializationsRepository
{
  constructor(
    @InjectPinoLogger(SpecializationsRepositoryMongodb.name)
    protected readonly logger: PinoLogger,
    config: MongodbConfig,
  ) {
    super(logger, config);
  }

  async getAll(): Promise<Specialization[]> {
    const specializations = await this.collection.find().toArray();

    return specializations.map(Specialization.fromPrimitives);
  }
}
