export abstract class EnumValueObject<T> {
  protected constructor(
    public readonly value: T | string,
    public readonly validValues: Record<string, unknown>,
  ) {
    this.validate(value);
  }

  valueOf(): T {
    return this.value as T;
  }

  toString(): string {
    if (this.value) {
      return this.value.toString();
    }
    return `${this.value}`;
  }

  toJSON(): T {
    return this.valueOf();
  }

  protected abstract throwErrorForInvalidValue(value: T): void;

  private validate(value: any): void {
    if (!Object.keys(this.validValues).includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }
}
