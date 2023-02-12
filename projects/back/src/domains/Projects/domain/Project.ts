import { ObjectId } from 'mongodb';
import { AggregateRoot, Address } from 'shared-workers';

interface ProjectPrimitives {
  _id?: any;
  name: string;
  address: Address;
  description: string;
  ownerId: string;
  workersIds?: string[];
  workers?: any[];
}

interface ProjectPrimitivesMongoDb {
  _id?: ObjectId;
  name: string;
  address: Address;
  description: string;
  ownerId: ObjectId;
  workersIds?: ObjectId[];
  workers?: any[];
}

export class Project extends AggregateRoot {
  constructor(
    readonly _id: any,
    readonly name: string,
    readonly address: any,
    readonly description: string,
    readonly ownerId: string,
    readonly workersIds: string[] = [],
    readonly workers?: any[],
  ) {
    super();
  }

  static fromPrimitives(plainData: ProjectPrimitives): Project {
    return new Project(
      plainData._id?.toString() || plainData._id,
      plainData.name,
      plainData.address,
      plainData.description,
      plainData.ownerId,
      plainData.workersIds,
      plainData.workers,
    );
  }

  toPrimitives(): ProjectPrimitives {
    const primitive: ProjectPrimitives = {
      _id: this._id,
      name: this.name,
      address: this.address,
      description: this.description,
      ownerId: this.ownerId,
      workersIds: this.workersIds,
    };

    if (this.workers) {
      primitive.workers = this.workers;
    }

    return primitive;
  }

  toPrimitivesMongodb(): ProjectPrimitivesMongoDb {
    return {
      _id: new ObjectId(this._id),
      name: this.name,
      address: this.address,
      description: this.description,
      ownerId: new ObjectId(this.ownerId),
      workersIds: this.workersIds.map((id) => new ObjectId(id)),
    };
  }
}
