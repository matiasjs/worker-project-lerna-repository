import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  UserCreateInputDto,
  UserCreateResponseDto,
} from './models/users-create.dto';
import { UserInsert } from '@domains/Users/application/UsersInsert';
import { UsersGetByEmail } from '@domains/Users/application/UsersGetByEmail';
import { UserGetByEmailOutput } from 'shared-workers';

@Injectable()
export class UsersService {
  constructor(
    @InjectPinoLogger(UsersService.name)
    private readonly logger: PinoLogger,
    private readonly userInsert: UserInsert,
    private readonly usersGetByEmail: UsersGetByEmail,
  ) {}

  public async create(
    input: UserCreateInputDto,
  ): Promise<UserCreateResponseDto> {
    const user = await this.userInsert.invoke(input);

    return {
      _id: user._id,
      ...user,
    };
  }

  public async getUSerByEmail(email: string): Promise<UserGetByEmailOutput> {
    const user = await this.usersGetByEmail.invoke(email);

    return {
      _id: user._id,
      ...user,
    };
  }
}
