import { createContext } from "react";

import { AuthUsersAxiosRepository } from "../domains/AuthUsers/infrastructure(azul)/AuthAxiosRepository";
import { GuildAxiosRepository } from "../domains/Guilds/infrastructure/GuildAxiosRepository";
import { ProjectsAxiosRepository } from "../domains/Projects/infrastructure/ProjectsAxiosRepository";
import { RolAxiosRepository } from "../domains/Roles/infrastructure/RolAxiosRepository";

import { WebStorageRepository } from "../domains/Shared/domain/WebStorageRepository";
import { AxiosConfig } from "../domains/Shared/infrastructure/AxiosConfig";
import { AxiosRepository } from "../domains/Shared/infrastructure/AxiosRepository";
import { LocalStorageRepository } from "../domains/Shared/infrastructure/LocalStorageRepository";

//TODO: move to process.env.
const baseURL = "http://localhost:5000/";
const timeout = 5000;
const headers = { "Content-Type": "application/json" };

const DIContext = createContext({
  authUsersRepository: {} as AuthUsersAxiosRepository,
  webStorageRepository: {} as WebStorageRepository,
  rolAxiosRepository: {} as RolAxiosRepository,
  guildAxiosRepository: {} as GuildAxiosRepository,
  projectsAxiosRepository: {} as ProjectsAxiosRepository,
});

const DIProvider = ({ children }: any) => {
  const axiosConfig = new AxiosConfig(baseURL, timeout, headers);
  const axiosRepository = new AxiosRepository(axiosConfig);

  const authUsersRepository = new AuthUsersAxiosRepository(axiosRepository);
  const rolAxiosRepository = new RolAxiosRepository(axiosRepository);
  const guildAxiosRepository = new GuildAxiosRepository(axiosRepository);
  const projectsAxiosRepository = new ProjectsAxiosRepository(axiosRepository);

  const webStorageRepository = new LocalStorageRepository();

  return (
    <DIContext.Provider
      value={{
        authUsersRepository,
        webStorageRepository,
        rolAxiosRepository,
        guildAxiosRepository,
        projectsAxiosRepository,
      }}
    >
      {children}
    </DIContext.Provider>
  );
};

export default DIProvider;
export { DIContext };
