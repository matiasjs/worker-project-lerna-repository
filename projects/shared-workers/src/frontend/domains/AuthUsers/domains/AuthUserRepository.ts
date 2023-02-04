import { UserLoginInput } from "../../../../domains";
import { AuthUserToken } from "./AuthUserToken";

export abstract class AuthUsersRepository {
  abstract login(data: UserLoginInput): Promise<AuthUserToken>;
}
