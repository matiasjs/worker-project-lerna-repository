export abstract class DomainError extends Error {
  parserType = 'DomainError';

  protected constructor(
    readonly errorCode: string,
    readonly errorMessage: string,
    readonly extra?: Record<string, unknown>,
  ) {
    super(errorMessage);
  }
}
