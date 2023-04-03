import { Guild } from "./Guild";

export abstract class GuildRepository {
  abstract getAll(): Promise<Guild[]>;
}
