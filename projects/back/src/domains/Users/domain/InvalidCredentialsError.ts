import { DomainError } from 'shared-workers';

export class InvalidCredentialsError extends DomainError {
  constructor(email: string) {
    super(
      'auth_user_invalid_credentials',
      `The AuthUser with email <${email}> credentials are invalid`,
    );
  }
}
