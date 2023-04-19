import { Injectable } from '@nestjs/common';
import { InvalidArgumentError } from 'shared-workers';

@Injectable()
export class RedisConfig {
  constructor(readonly readUrl: string, readonly writeUrl: string) {}

  static fromPrimitives(plainData: {
    readUrl: string;
    writeUrl: string;
  }): RedisConfig {
    return new RedisConfig(plainData.readUrl, plainData.writeUrl);
  }

  validate(): void {
    if (!this.readUrl) {
      throw new InvalidArgumentError(`RedisConfig readUrl is undefined`);
    }

    if (!this.writeUrl) {
      throw new InvalidArgumentError(`RedisConfig writeUrl is undefined`);
    }
  }
}
