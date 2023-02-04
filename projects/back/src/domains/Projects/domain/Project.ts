import { AggregateRoot } from 'shared-workers';

interface ProjectPrimitives {
  _id?: any;
  description: string;
}

export class Project extends AggregateRoot {
  constructor(readonly _id: any, readonly description: string) {
    super();
  }

  static fromPrimitives(plainData: ProjectPrimitives): Project {
    return new Project(
      plainData._id?.toString() || plainData._id,
      plainData.description,
    );
  }

  toPrimitives(): ProjectPrimitives {
    return {
      _id: this._id,
      description: this.description,
    };
  }
}
