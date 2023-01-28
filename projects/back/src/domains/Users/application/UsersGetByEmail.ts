import { UsersRepository } from '../domain/UsersRepository';
import { AuthUserResponse } from '../../Shared/application/responses/AuthUserResponse';
import { UserNotFoundError } from '../domain/UserNotFoundError';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class UsersGetByEmail {
  constructor(private readonly usersRepository: UsersRepository) {}

  async invoke(email: string): Promise<AuthUserResponse> {
    let user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError(email);
    }

    const response = user.toPrimitives();

    delete response.password;

    return response;
  }
}
