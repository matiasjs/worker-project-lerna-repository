import { UserLoginInput } from "shared-workers";
import { AuthUserToken } from "./AuthUserToken";
import { User } from "./User";

export abstract class AuthUsersRepository {
  abstract login(data: UserLoginInput): Promise<AuthUserToken>;
  abstract logout(): Promise<void>;
  abstract register(user: User): Promise<User>;
}
