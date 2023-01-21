import { AuthUserToken } from "../domain/AuthUserToken";
import { AuthUsersRepository } from "../domain/AuthUserRepository";
import { AxiosRepository } from "../../Shared/infrastructure/AxiosRepository";

import { UserLoginInput } from "shared-workers";

export class AuthUsersAxiosRepository implements AuthUsersRepository {
  constructor(private readonly axiosInstace: AxiosRepository) {}

  async login({ username, password }: UserLoginInput): Promise<AuthUserToken> {
    const accessToken: string = await this.axiosInstace
      .post("/v1/login", {
        username,
        password,
      })
      .then(({ data }: { data: { accessToken: string; expire: number } }) => {
        // TODO: regresar las 2 cosas o no?
        return data.accessToken;
      });

    return AuthUserToken.fromPrimitives({ accessToken });
  }
}
