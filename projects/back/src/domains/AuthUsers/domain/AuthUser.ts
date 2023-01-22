import { AggregateRoot } from 'shared-workers';

interface AuthUserPrimitives {
  username: string;
  password: string;
  rolId: string;
  rol?: {
    _id: any;
    description: string;
  };
}

export class AuthUser extends AggregateRoot {
  constructor(
    readonly username: string,
    readonly password: string,
    readonly rolId: string,
    readonly rol?: { _id: any; description: string },
  ) {
    super();
  }

  static fromPrimitives(plainData: AuthUserPrimitives): AuthUser {
    return new AuthUser(
      plainData.username,
      plainData.password,
      plainData.rolId,
      plainData.rol,
    );
  }

  toPrimitives(): AuthUserPrimitives {
    return {
      username: this.username,
      password: this.password,
      rolId: this.rolId,
      rol: this.rol,
    };
  }
}
