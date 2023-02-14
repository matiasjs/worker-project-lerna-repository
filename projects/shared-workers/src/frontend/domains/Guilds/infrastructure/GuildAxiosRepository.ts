import { GuildRepository } from "../domain/GuildRepository";
import { Guild } from "../domain/Guild";
import { RequestRepository } from "../../Shared/domain/RequestRepository";

export class GuildAxiosRepository implements GuildRepository {
  constructor(private readonly axiosInstace: RequestRepository) {}

  async getAll(): Promise<Guild[]> {
    const guilds = await this.axiosInstace
      .get("v1/specializations")
      .then((response) => response.data);

    return guilds.map((guild) => Guild.fromPrimitives(guild));
  }
}
