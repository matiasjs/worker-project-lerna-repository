import { ObjectId } from 'mongodb';
import { AggregateRoot, Address } from 'shared-workers';

interface ProjectWorkersPrimitives {
  workerId: string;
  budget?: number;
  stars?: number;
  opinion?: string;
}

interface ProjectPrimitives {
  _id?: any;
  name: string;
  address: Address;
  description: string;
  ownerId: string;
  workers?: ProjectWorkersPrimitives[];
}

interface ProjectWorkersPrimitivesMongoDb {
  workerId: ObjectId;
  budget?: number;
  stars?: number;
  opinion?: string;
}

interface ProjectPrimitivesMongoDb {
  _id?: ObjectId;
  name: string;
  address: Address;
  description: string;
  ownerId: ObjectId;
  workers?: ProjectWorkersPrimitivesMongoDb[];
}

export class Project extends AggregateRoot {
  constructor(
    readonly _id: any,
    readonly name: string,
    readonly address: any,
    readonly description: string,
    readonly ownerId: string,
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
      workers: this.workers.map((projectWorker) => ({
        ...projectWorker,
        workerId: new ObjectId(projectWorker.workerId),
      })),
    };
  }
}
