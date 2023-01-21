import { AuthUsersRepository } from '../domain/AuthUsersRepository';
import { AuthUser } from '../domain/AuthUser';
import { Injectable } from '@nestjs/common/decorators';

import { Nullable } from 'shared-workers';

@Injectable()
export class AuthUsersRepositoryMongodb implements AuthUsersRepository {
  async findByUsername(username: string): Promise<Nullable<AuthUser>> {
    return AuthUser.fromPrimitives({
      username,
      password: 'password',
    });
  }
}
