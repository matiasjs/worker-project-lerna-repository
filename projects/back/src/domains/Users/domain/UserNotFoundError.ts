import { DomainError } from 'shared-workers';

export class UserNotFoundError extends DomainError {
  constructor(email: string) {
    super('user_not_found', `The User with email <${email}> doesn't exist`);
  }
}
