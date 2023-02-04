import { AuthUsersRepository } from "../domains/AuthUserRepository";
import { AuthUserToken } from "../domains/AuthUserToken";

export class AuthUserLogin {
  constructor(private readonly authUsersRepository: AuthUsersRepository) {}

  async invoke(email: string, password: string): Promise<AuthUserToken> {
    const authUserToken = await this.authUsersRepository.login({
      email,
      password,
    });

    if (!authUserToken) {
      // TODO: dominizarlo(?)
      throw Error(`Error generico ${authUserToken}`);
    }

    return authUserToken;
  }
}
