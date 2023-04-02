import { UserCreateOutput } from "shared-workers";
import { AuthUsersRepository } from "../domain(verde)/AuthUserRepository";
import { User } from "../domain(verde)/User";

interface Params {
  name: string;
  surname: string;
  rolId: string;
  specializationsId: string[];
  email: string;
  password: string;
}

export class AuthUserRegister {
  constructor(private readonly authUsersRepository: AuthUsersRepository) {}

  async invoke(params: Params): Promise<UserCreateOutput> {
    const user = await this.authUsersRepository.register(
      User.fromPrimitives(params)
    );

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      surname: user.surname,
      rank: user.rank,
      rolId: user.rolId,
      specializationsId: user.specializationsId,
      rol: user.rol,
      specializations: user.specializations,
    };
  }
}
