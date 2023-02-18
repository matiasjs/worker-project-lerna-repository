interface UserTokenPrimitives {
  _id?: string;
  rank?: number;
  rol?: any;
  specializations?: any;
  name: string;
  surname: string;
  rolId: string;
  specializationsId: string[];
  email: string;
  password: string;
}

export class User {
  constructor(
    readonly name: string,
    readonly surname: string,
    readonly rolId: string,
    readonly specializationsId: string[],
    readonly email: string,
    readonly password: string,
    readonly _id?: string,
    readonly rank?: number,
    readonly rol?: any,
    readonly specializations?: any
  ) {}

  static fromPrimitives(plainData: UserTokenPrimitives): User {
    return new User(
      plainData.name,
      plainData.surname,
      plainData.rolId,
      plainData.specializationsId,
      plainData.email,
      plainData.password,
      plainData?._id,
      plainData?.rank,
      plainData?.rol,
      plainData?.specializations
    );
  }

  toPrimitives(): UserTokenPrimitives {
    return {
      name: this.name,
      surname: this.surname,
      rolId: this.rolId,
      specializationsId: this.specializationsId,
      email: this.email,
      password: this.password,
      _id: this._id,
      rank: this.rank,
      rol: this.rol,
      specializations: this.specializations,
    };
  }
}
