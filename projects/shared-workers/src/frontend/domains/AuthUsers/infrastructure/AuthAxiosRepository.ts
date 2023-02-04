import { AuthUserToken } from "../domains/AuthUserToken";
import { AuthUsersRepository } from "../domains/AuthUserRepository";
import { AxiosRepository } from "../../Shared/infrastructure/AxiosRepository";
import { UserLoginInput } from "../../../../domains";

export class AuthUsersAxiosRepository implements AuthUsersRepository {
  constructor(private readonly axiosInstace: AxiosRepository) {}

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
