import { AuthUsersRepository } from "../domain(verde)/AuthUserRepository";
import { AuthUserToken } from "../domain(verde)/AuthUserToken";

export class AuthUserLogin {
  constructor(private readonly authUsersRepository: AuthUsersRepository) {}

  async invoke(email: string, password: string): Promise<AuthUserToken> {
    const authUserToken = await this.authUsersRepository.login({
      email,
      password,
    });

    console.log(email, password);

    if (!authUserToken) {
      // TODO: dominizarlo(?)
      throw Error(`Error generico ${authUserToken}`);
    }

    return authUserToken;
  }
}
