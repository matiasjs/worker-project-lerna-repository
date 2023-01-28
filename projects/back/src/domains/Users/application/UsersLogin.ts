import { UsersRepository } from '../domain/UsersRepository';
import { AuthUserResponse } from '../../Shared/application/responses/AuthUserResponse';
import { UserNotFoundError } from '../domain/UserNotFoundError';
import { InvalidCredentialsError } from '../domain/InvalidCredentialsError';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class UserLogin {
  constructor(private readonly usersRepository: UsersRepository) {}

  async invoke(email: string, password: string): Promise<AuthUserResponse> {
    let user = await this.usersRepository.findByEmailLogin(email);

    if (!user) {
      console.error(`Username <${email}> not found`);
      throw new UserNotFoundError(email);
    }

    if (user?.password !== password) {
      console.error(
        `Username <${email}> invalid credentials`,
        user?.password,
        password,
      );
      throw new InvalidCredentialsError(email);
    }

    const response = user.toPrimitives();

    delete response.password;

    return response;
  }
}
