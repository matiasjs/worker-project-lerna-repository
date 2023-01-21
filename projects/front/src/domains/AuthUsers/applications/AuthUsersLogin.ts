import { AuthUsersRepository } from "../domain/AuthUserRepository";
import { AuthUserToken } from "../domain/AuthUserToken";

export class AuthUserLogin {
  constructor(private readonly authUsersRepository: AuthUsersRepository) {}

  async invoke(username: string, password: string): Promise<AuthUserToken> {
    const authUserToken = await this.authUsersRepository.login({
      username,
      password,
    });

    if (!authUserToken) {
      // TODO: dominizarlo(?)
      throw Error("Error generico", authUserToken);
    }

    return authUserToken;
  }
}
