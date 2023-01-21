import { AggregateRoot } from 'shared-workers';

interface AuthUserPrimitives {
  username: string;
  password: string;
}

export class AuthUser extends AggregateRoot {
  constructor(readonly username: string, readonly password: string) {
    super();
  }

  static fromPrimitives(plainData: AuthUserPrimitives): AuthUser {
    return new AuthUser(plainData.username, plainData.password);
  }

  toPrimitives(): AuthUserPrimitives {
    return {
      username: this.username,
      password: this.password,
    };
  }
}
