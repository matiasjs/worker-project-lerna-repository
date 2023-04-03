interface ProjectPrimitives {
  _id?: string;
  name: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    number: string;
    zip_code: string;
    floor: string;
    tower: string;
    department: string;
  };
  description: string;
  ownerId: string;
  workersId?: string[];
  workers?: {
    workerId: string;
    worker: {
      _id: string;
      password: string;
      rolId: string;
      email: string;
      name: string;
      surname: string;
      specializationsId: string[];
      rank: number;
    };
  }[];
}

export class Project {
    constructor(
        readonly name: string,
        readonly address: any,
        readonly description: string,
        readonly ownerId: string,
        readonly _id?: string,
        readonly workersId?: string[],
        readonly workers?: any,
    ) {}

  static fromPrimitives(plainData: ProjectPrimitives): Project {
    return new Project(
        plainData.name,
        plainData.address,
        plainData.description,
        plainData.ownerId,
        plainData._id,
        plainData.workersId,
        plainData.workers,
    );
  }

  toPrimitives(): ProjectPrimitives {
    return {
        name: this.name,
        address: this.address,
        description: this.description,
        ownerId: this.ownerId,
        _id: this._id,
        workersId: this.workersId,
        workers: this.workers,
    };
  }
}
