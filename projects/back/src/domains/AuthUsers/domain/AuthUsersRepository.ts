import { AuthUser } from './AuthUser';
import { Nullable } from 'shared-workers';

export abstract class AuthUsersRepository {
  abstract findByUsername(username: string): Promise<Nullable<AuthUser>>;
}
