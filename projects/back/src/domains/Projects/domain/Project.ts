import { AggregateRoot, Address } from 'shared-workers';

interface ProjectPrimitives {
  _id?: any;
  name: string;
  address: Address;
  description: string;
  workersIds?: string[];
  workers?: any[];
}

export class Project extends AggregateRoot {
  constructor(
    readonly _id: any,
    readonly name: string,
    readonly address: any,
    readonly description: string,
    readonly workersIds: string[] = [],
    readonly workers: any[] = [],
  ) {
    super();
  }

  static fromPrimitives(plainData: ProjectPrimitives): Project {
    return new Project(
      plainData._id?.toString() || plainData._id,
      plainData.name,
      plainData.address,
      plainData.description,
      plainData.workersIds,
      plainData.workers,
    );
  }

  toPrimitives(): ProjectPrimitives {
    return {
      _id: this._id,
      name: this.name,
      address: this.address,
      description: this.description,
      workersIds: this.workersIds,
      workers: this.workers,
    };
  }
}
