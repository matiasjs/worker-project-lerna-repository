import { MongoClient, Db, Collection } from 'mongodb';
import { MongodbConfig } from './MongodbConfig';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

export class MongodbRepository {
  protected mongoClient: MongoClient = null;
  protected db: Db;
  protected collection: Collection<any>;

  constructor(
    @InjectPinoLogger(MongodbRepository.name)
    protected readonly logger: PinoLogger,
    config: MongodbConfig,
  ) {
    config.validate();
    config.host;
    config.port;
    config.db;
    config.collection;
    this.mongoClient = new MongoClient(
      `mongodb://${config.host}:${config.port}`,
      config.getMongoClientOptions(),
    );
    this.init(config);
  }

  async init(config: MongodbConfig) {
    if (!this.mongoClient) {
      await this.mongoClient.connect();
      this.logger.debug('Mongodb Repository connected');
    }

    this.db = this.mongoClient.db(config.db);
    this.logger.debug(`Mongodb Repository DB: ${config.db}`);
    this.collection = this.db.collection(config.collection);
    this.logger.debug(`Mongodb Repository Collection: ${config.collection}`);
  }
}
