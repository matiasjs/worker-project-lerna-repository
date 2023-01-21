import { InvalidArgumentError } from 'shared-workers';

interface MongodbConfigPrimitive {
  host: string;
  port: number;
  db: string;
  collection: string;
  user?: string;
  pass?: string;
  ssl?: boolean;
  sslCA?: Buffer[];
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
    readonly user?: string,
    readonly pass?: string,
    readonly ssl?: boolean,
    readonly sslCA?: Buffer[],
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
      plainData.user,
      plainData.pass,
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
}
