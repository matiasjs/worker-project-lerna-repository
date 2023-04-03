import { SpecializationsGetAllOutput } from "shared-workers";
import { GuildRepository } from "../domain/GuildRepository";

export class GetAllGuilds {
  constructor(private readonly guildsRepository: GuildRepository) {}

  async invoke(): Promise<SpecializationsGetAllOutput> {
    const guilds = await this.guildsRepository.getAll();

    return guilds.map((guild) => guild.toPrimitives());
  }
}
