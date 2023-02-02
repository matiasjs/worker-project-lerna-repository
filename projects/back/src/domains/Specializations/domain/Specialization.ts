import { AggregateRoot } from 'shared-workers';

interface SpecializationPrimitives {
  _id?: any;
  description: string;
}

export class Specialization extends AggregateRoot {
  constructor(readonly _id: any, readonly description: string) {
    super();
  }

  static fromPrimitives(plainData: SpecializationPrimitives): Specialization {
    return new Specialization(
      plainData._id?.toString() || plainData._id,
      plainData.description,
    );
  }

  toPrimitives(): SpecializationPrimitives {
    return {
      _id: this._id,
      description: this.description,
    };
  }
}
