import { AuthUsersRepository } from "../domain/AuthUserRepository";
import { AuthUserToken } from "../domain/AuthUserToken";

export class AuthUserLogin {
  constructor(private readonly authUsersRepository: AuthUsersRepository) {
    console.log("AuthUserLogin", Date.now());
  }

  async invoke(username: string, password: string): Promise<AuthUserToken> {
    const authUserToken = await this.authUsersRepository.login({
      username,
      password,
    });

    if (!authUserToken) {
      throw Error("LA CONCHA DE TU HERMANA", authUserToken);
    }

    return authUserToken;
  }
}
