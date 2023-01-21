import { AuthUsersRepository } from '../domain/AuthUsersRepository';
import { AuthUserResponse } from '../../Shared/application/responses/AuthUserResponse';
import { AuthUserNotFoundError } from '../domain/AuthUserNotFoundError';
import { InvalidCredentialsError } from '../domain/InvalidCredentialsError';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class AuthUserLogin {
  constructor(private readonly authUsersRepository: AuthUsersRepository) {}

  async invoke(username: string, password: string): Promise<AuthUserResponse> {
    const authUser = await this.authUsersRepository.findByUsername(username);

    if (!authUser) {
      console.error(`Username <${username}> not found`);
      throw new AuthUserNotFoundError(username);
    }

    if (authUser.password !== password) {
      console.error(`Username <${username}> invalid credentials`);
      throw new InvalidCredentialsError(username);
    }

    return { username: authUser.username };
  }
}
