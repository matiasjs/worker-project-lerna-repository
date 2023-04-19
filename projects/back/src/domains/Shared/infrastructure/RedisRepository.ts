import { createClient, RedisClientType } from 'redis';

import { Injectable } from '@nestjs/common';

import { RedisConfig } from './RedisConfig';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class RedisRepository {
  private readonly readClient: RedisClientType;
  private readonly writeClient: RedisClientType;

  constructor(
    private readonly config: RedisConfig,
    @InjectPinoLogger(RedisRepository.name)
    protected readonly logger: PinoLogger,
  ) {
    this.config.validate();
    this.readClient = createClient({ url: this.config.readUrl });
    this.writeClient = createClient({ url: this.config.writeUrl });

    this.readClient.connect();
    this.writeClient.connect();
  }

  onModuleInit(): void {
    this.readClient.on('connect', () => {
      this.logger.debug('Read client has been connected');
    });

    this.readClient.on('error', (error) => {
      this.logger.error('Error on read client', { error });
    });

    this.readClient.on('reconnecting', () => {
      this.logger.debug('Reconnecting read client...');
    });

    this.writeClient.on('connect', () => {
      this.logger.debug('Write client has been connected');
    });

    this.writeClient.on('error', (error) => {
      this.logger.error('Error on write client', { error });
    });

    this.writeClient.on('reconnecting', () => {
      this.logger.debug('Reconnecting write client...');
    });
  }

  onModuleDestroy(): void {
    // this.readClient.end(true);
    // this.writeClient.end(true);
  }

  /**
   * @param key the key inside the prefix scope
   */
  async get<T>(key: string): Promise<T> {
    this.logger.debug(`Getting key <${key}>`);

    return this.readClient
      .get(key)
      .then((response) => this.parseResult(response) as T);
  }

  /**
   * @param key the key inside the prefix scope
   * @param value the value that will be saved on that key
   * @param expire time in seconds
   */
  async set<T>(key: string, value: T, expire: number = null): Promise<void> {
    this.logger.debug(
      `Setting key <${key}>` + (expire ? `, Expire in ${expire}s` : ''),
    );

    this.writeClient.set(key, this.stringifyValue(value), { EX: expire });
  }

  async del<T>(key: string | string[]): Promise<void> {
    this.logger.debug(`Deleting key <${key}>`);

    this.writeClient.del(key);
  }

  // async mset<T>(keys: string[], values: T[], expire: number): Promise<void> {
  //   const promises = [];

  //   for (let index = 0; index < keys.length; index++) {
  //     promises.push(this.set(keys[index], values[index], expire));
  //   }

  //   await Promise.all(promises);
  // }

  // async mget<T>(keys: string[]): Promise<T[]> {
  //   return new Promise((resolve, reject) => {
  //     this.readClient.mget(keys, (error, results) => {
  //       if (error) {
  //         return reject(error);
  //       }

  //       resolve(
  //         results.map((result) => {
  //           return this.parseResult(result) as T;
  //         }),
  //       );
  //     });
  //   });
  // }

  // async increment<T>(key: string): Promise<number> {
  //   this.logger.debug(`Incrementing key <${key}>`);
  //   return new Promise((resolve, reject) => {
  //     this.writeClient.incr(key, (error, current) => {
  //       if (error) {
  //         return reject(error);
  //       }
  //       return resolve(current);
  //     });
  //   });
  // }

  // async ttl(key: string): Promise<number> {
  //   this.logger.debug(`Getting ttl of key <${key}>`);
  //   return new Promise((resolve, reject) => {
  //     this.readClient.ttl(key, (error, ttl) => {
  //       if (error) {
  //         return reject(error);
  //       }
  //       return resolve(ttl);
  //     });
  //   });
  // }

  // async expire(key: string, expireSeconds: number): Promise<void> {
  //   this.logger.debug(`Setting ttl of key <${key}> to ${expireSeconds}s`);
  //   return new Promise((resolve, reject) => {
  //     this.writeClient.expire(key, expireSeconds, (error) => {
  //       if (error) {
  //         return reject(error);
  //       }
  //       return resolve();
  //     });
  //   });
  // }

  private stringifyValue(value: unknown): string {
    if (typeof value === 'string') {
      return value;
    }

    try {
      return JSON.stringify(value);
    } catch (error) {
      this.logger.error('Error stringifying value', { value });
      throw error;
    }
  }

  private parseResult(result: string): unknown {
    if (!result) {
      return null;
    }

    try {
      return JSON.parse(result);
    } catch (error) {
      this.logger.debug('Returning as a plain string', { result });
      return result;
    }
  }
}
