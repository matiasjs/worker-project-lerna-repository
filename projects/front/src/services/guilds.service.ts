import { GetAllGuilds } from "shared-workers";
import { DIContext } from "../contexts/dependency-injection.context";
import { useContext, useState } from "react";

const guildsService = () => {
  const { guildAxiosRepository, webStorageRepository } = useContext(DIContext);

  const getAllGuildsUseCase = new GetAllGuilds(guildAxiosRepository);

  const getAllGuilds = async () => {
    const guilds = await getAllGuildsUseCase.invoke();

    webStorageRepository.save("guilds", guilds.toString());

    return guilds;
  };

  return { getAllGuilds };
};

export default guildsService;
