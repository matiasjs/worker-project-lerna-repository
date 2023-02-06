import { AuthUserToken } from "../domain(verde)/AuthUserToken";
import { AuthUsersRepository } from "../domain(verde)/AuthUserRepository";

import { RequestRepository } from "../../Shared";
import { UserLoginInput } from "../../../../domains";

export class AuthUsersAxiosRepository implements AuthUsersRepository {
  constructor(private readonly axiosInstace: RequestRepository) {}

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
