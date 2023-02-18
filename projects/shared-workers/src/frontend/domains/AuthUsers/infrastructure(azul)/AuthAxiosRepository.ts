import { AuthUserToken } from "../domain(verde)/AuthUserToken";
import { AuthUsersRepository } from "../domain(verde)/AuthUserRepository";

import { User } from "../domain(verde)/User";
import { RequestRepository } from "../../Shared/domain/RequestRepository";
import { UserLoginInput } from "../../../../domains/inputs/users-login.input";

export class AuthUsersAxiosRepository implements AuthUsersRepository {
  constructor(private readonly axiosInstace: RequestRepository) {}

  async register(user: User): Promise<User> {
    const response = await this.axiosInstace.post(
      "/v1/users",
      user.toPrimitives()
    );

    return User.fromPrimitives(response);
  }

  async logout(): Promise<void> {
    await this.axiosInstace.post("/v1/logout");

    return;
  }

  async login({ email, password }: UserLoginInput): Promise<AuthUserToken> {
    const accessToken: string = await this.axiosInstace
      .post("/v1/login", {
        email,
        password,
      })
      .then(({ data }: { data: { accessToken: string; expire: number } }) => {
        // TODO: regresar las 2 cosas o no?
        return data.accessToken;
      });

    return AuthUserToken.fromPrimitives({ accessToken });
  }
}
