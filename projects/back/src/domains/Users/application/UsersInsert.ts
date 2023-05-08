import { InsertUserResponse } from '@domains/Shared/application/responses/InsertUserResponse';
import { Injectable } from '@nestjs/common/decorators';
import { User } from '../domain/User';
import { UsersRepository } from '../domain/UsersRepository';

interface UserInserInput {
  email: string;
  password: string;
  name: string;
  surname: string;
  rank: number;
  rolId: string;
  specializationsId: string[];
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    number: number;
    zip_code: string;
    floor: string;
    tower: string;
    department: string;
    coordinates: {
      lat: string;
      long: string;
    };
  };
}

@Injectable()
export class UserInsert {
  constructor(private readonly usersRepository: UsersRepository) {}

  async invoke(input: UserInserInput): Promise<InsertUserResponse> {
    const inputUser = User.fromPrimitives({ ...input });
    const user = await this.usersRepository.insert(inputUser).catch(
      (error) =>
        ({
          _id: error?.code,
        } as User),
    );

    if (!user) {
      throw new Error('TODO not user');
    }

    if (user._id === 11000) {
      // E11000 duplicate key error collection: workers.users index: email_1 dup key: { email: "xxx" }
      throw new Error(
        `User with the email: ${input.email} has already registered`,
      );
    }

    if (!user._id) {
      throw new Error('TODO not _id');
    }

    return user.toPrimitives();
  }
}
