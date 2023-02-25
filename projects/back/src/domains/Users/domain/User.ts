import { ObjectId } from 'mongodb';
import { AggregateRoot } from 'shared-workers';

interface UserPrimitives {
  _id?: any;
  email: string;
  password: string;
  name: string;
  surname: string;
  rank: number;
  rolId: string;
  rol?: {
    _id: string;
    description: string;
  };
  specializationsId: string[];
  specializations?: {
    _id: string;
    description: string;
  }[];
}

interface UserPrimitivesMongoDb {
  _id?: any;
  email: string;
  password: string;
  name: string;
  surname: string;
  rank: number;
  rolId: ObjectId;
  specializationsId: ObjectId[];
}

export class User extends AggregateRoot {
  constructor(
    readonly _id: any,
    readonly email: string,
    readonly password: string,
    readonly name: string,
    readonly surname: string,
    readonly rank: number,
    readonly rolId: string,
    readonly specializationsId: string[],
    readonly rol?: { _id: string; description: string },
    readonly specializations?: { _id: string; description: string }[],
  ) {
    super();
  }

  static fromPrimitives(plainData: UserPrimitives): User {
    return new User(
      plainData._id?.toString() || plainData._id,
      plainData.email,
      plainData.password,
      plainData.name,
      plainData.surname,
      plainData.rank,
      plainData.rolId?.toString() || plainData.rolId,
      plainData.specializationsId?.map((spe) => spe.toString()) ||
        plainData.specializationsId,
      plainData.rol,
      plainData.specializations,
    );
  }

  toPrimitives(): UserPrimitives {
    return {
      _id: this._id,
      email: this.email,
      password: this.password,
      name: this.name,
      surname: this.surname,
      rank: this.rank,
      rolId: this.rolId,
      specializationsId: this.specializationsId,
      rol: this.rol,
      specializations: this.specializations,
    };
  }

  toPrimitivesMongodb(): UserPrimitivesMongoDb {
    return {
      _id: this._id,
      email: this.email,
      password: this.password,
      name: this.name,
      surname: this.surname,
      rank: this.rank,
      rolId: new ObjectId(this.rolId),
      specializationsId: this.specializationsId.map(
        (specializationId) => new ObjectId(specializationId),
      ),
    };
  }
}
