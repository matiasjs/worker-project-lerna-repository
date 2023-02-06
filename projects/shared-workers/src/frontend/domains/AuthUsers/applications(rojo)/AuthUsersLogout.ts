import { AuthUsersRepository } from "../domain(verde)/AuthUserRepository";
import { AuthUserToken } from "../domain(verde)/AuthUserToken";

export class AuthUserLogout {
  constructor(private readonly authUsersRepository: AuthUsersRepository) {}

  async invoke(): Promise<void> {
    await this.authUsersRepository.logout();

    return;
  }
}
