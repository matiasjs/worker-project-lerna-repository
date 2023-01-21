import { DomainError } from './DomainError';

export class MultipleError extends DomainError {
  constructor(readonly errors: Error[]) {
    super('multiple_error', `A total of <${errors.length}> errors had been accumulated`);
  }
}
