import { AuthUsersRepository } from "../domain(verde)/AuthUserRepository";

export class AuthUserLogout {
  constructor(private readonly authUsersRepository: AuthUsersRepository) {}

  async invoke(): Promise<void> {
    await this.authUsersRepository.logout();

    return;
  }
}
