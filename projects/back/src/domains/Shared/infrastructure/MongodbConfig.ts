import { MongoClientOptions } from 'mongodb';
import { InvalidArgumentError } from 'shared-workers';

interface MongodbConfigPrimitive {
  host: string;
  port: number;
  db: string;
  collection: string;
  auth?: {
    username: string;
    password: string;
  };
  ssl?: boolean;
  sslCA?: string;
  keepAlive?: boolean;
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
  useCreateIndex?: boolean;
  useFindAndModify?: boolean;
}

export class MongodbConfig {
  constructor(
    readonly host: string,
    readonly port: number,
    readonly db: string,
    readonly collection: string,
    readonly auth?: { username: string; password: string },
    readonly ssl?: boolean,
    readonly sslCA?: string,
    readonly keepAlive?: boolean,
    readonly useNewUrlParser?: boolean,
    readonly useUnifiedTopology?: boolean,
    readonly useCreateIndex?: boolean,
    readonly useFindAndModify?: boolean,
  ) {}

  static fromPrimitives(plainData: MongodbConfigPrimitive): MongodbConfig {
    return new MongodbConfig(
      plainData.host,
      plainData.port,
      plainData.db,
      plainData.collection,
      plainData.auth,
      plainData.ssl,
      plainData.sslCA,
      plainData.keepAlive,
      plainData.useNewUrlParser,
      plainData.useUnifiedTopology,
      plainData.useCreateIndex,
      plainData.useFindAndModify,
    );
  }

  validate(): void {
    if (!this.host) {
      throw new InvalidArgumentError(`MongodbConfig host is undefined`);
    }

    if (!this.port) {
      throw new InvalidArgumentError(`MongodbConfig port is undefined`);
    }

    if (!this.db) {
      throw new InvalidArgumentError(`MongodbConfig db is undefined`);
    }

    if (!this.collection) {
      throw new InvalidArgumentError(`MongodbConfig collection is undefined`);
    }
  }

  getMongoClientOptions(): MongoClientOptions {
    return {
      auth: this.auth,
      ssl: this.ssl,
      sslCA: this.sslCA,
      keepAlive: this.keepAlive,
      useNewUrlParser: this.useNewUrlParser,
      useUnifiedTopology: this.useUnifiedTopology,
      useCreateIndex: this.useCreateIndex,
      useFindAndModify: this.useFindAndModify,
    } as MongoClientOptions;
  }
}
