import { ObjectId } from 'mongodb';
import { AggregateRoot } from 'shared-workers';

interface UserPrimitives {
  _id?: any;
  email: string;
  password: string;
  name: string;
  surname: string;
  rolid: string;
  rol?: {
    _id: string;
    description: string;
  };
  specializationid: string;
  specialization?: {
    _id: string;
    description: string;
  };
}

interface UserMongodbFormat {
  _id?: any;
  email: string;
  password: string;
  name: string;
  surname: string;
  rolid: ObjectId;
  specializationid: ObjectId;
}

export class User extends AggregateRoot {
  constructor(
    readonly _id: any,
    readonly email: string,
    readonly password: string,
    readonly name: string,
    readonly surname: string,
    readonly rolid: string,
    readonly specializationid: string,
    readonly rol?: { _id: string; description: string },
    readonly specialization?: { _id: string; description: string },
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
      plainData.rolid?.toString() || plainData.rolid,
      plainData.specializationid?.toString() || plainData.specializationid,
      plainData.rol,
      plainData.specialization,
    );
  }

  toPrimitives(): UserPrimitives {
    return {
      _id: this._id,
      email: this.email,
      password: this.password,
      name: this.name,
      surname: this.surname,
      rolid: this.rolid,
      specializationid: this.specializationid,
      rol: this.rol,
      specialization: this.specialization,
    };
  }

  toMongodb(): UserMongodbFormat {
    return {
      _id: this._id,
      email: this.email,
      password: this.password,
      name: this.name,
      surname: this.surname,
      rolid: new ObjectId(this.rolid),
      specializationid: new ObjectId(this.specializationid),
    };
  }
}
