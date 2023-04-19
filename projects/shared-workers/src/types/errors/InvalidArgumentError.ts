import { DomainError } from './DomainError';

export class InvalidArgumentError extends DomainError {
  constructor(message: string) {
    super('invalid_argument', message);
  }
}
