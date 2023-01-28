import { AggregateRoot } from 'shared-workers';

interface RolPrimitives {
  _id?: any;
  description: string;
}

export class Rol extends AggregateRoot {
  constructor(readonly _id: any, readonly description: string) {
    super();
  }

  static fromPrimitives(plainData: RolPrimitives): Rol {
    return new Rol(
      plainData._id?.toString() || plainData._id,
      plainData.description,
    );
  }

  toPrimitives(): RolPrimitives {
    return {
      _id: this._id,
      description: this.description,
    };
  }
}
