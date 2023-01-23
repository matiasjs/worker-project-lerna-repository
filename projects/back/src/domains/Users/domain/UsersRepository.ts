import { User } from './User';
import { Nullable } from 'shared-workers';

export abstract class UsersRepository {
  abstract findByEmailLogin(email: string): Promise<Nullable<User>>;
  abstract findByEmail(email: string): Promise<Nullable<User>>;
  abstract insert(user: User): Promise<Nullable<User>>;
}
