interface AuthUserTokenPrimitives {
  accessToken: string;
}

export class AuthUserToken {
  constructor(readonly accessToken: string) {}

  static fromPrimitives(plainData: AuthUserTokenPrimitives): AuthUserToken {
    return new AuthUserToken(plainData.accessToken);
  }

  toPrimitives(): AuthUserTokenPrimitives {
    return {
      accessToken: this.accessToken,
    };
  }
}
