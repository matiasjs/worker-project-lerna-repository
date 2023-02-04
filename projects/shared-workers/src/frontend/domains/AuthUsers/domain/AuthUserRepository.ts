import { UserLoginInput } from "shared-workers";
import { AuthUserToken } from "./AuthUserToken";

export abstract class AuthUsersRepository {
  abstract login(data: UserLoginInput): Promise<AuthUserToken>;
}
