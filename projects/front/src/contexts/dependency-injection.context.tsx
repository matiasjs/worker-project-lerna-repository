import { createContext } from "react";
import {
  AuthUsersAxiosRepository,
  AxiosConfig,
  AxiosRepository,
  LocalStorageRepository,
  WebStorageRepository,
  RolAxiosRepository,
  GuildAxiosRepository,
} from "shared-workers";

//TODO: move to process.env.
const baseURL = "http://localhost:5000/";
const timeout = 5000;
const headers = { "Content-Type": "application/json" };

const DIContext = createContext({
  authUsersRepository: {} as AuthUsersAxiosRepository,
  webStorageRepository: {} as WebStorageRepository,
  rolAxiosRepository: {} as RolAxiosRepository,
  guildAxiosRepository: {} as GuildAxiosRepository,
});

const DIProvider = ({ children }: any) => {
  const axiosConfig = new AxiosConfig(baseURL, timeout, headers);
  const axiosRepository = new AxiosRepository(axiosConfig);

  const authUsersRepository = new AuthUsersAxiosRepository(axiosRepository);
  const rolAxiosRepository = new RolAxiosRepository(axiosRepository);
  const guildAxiosRepository = new GuildAxiosRepository(axiosRepository);

  const webStorageRepository = new LocalStorageRepository();

  return (
    <DIContext.Provider
      value={{
        authUsersRepository,
        webStorageRepository,
        rolAxiosRepository,
        guildAxiosRepository,
      }}
    >
      {children}
    </DIContext.Provider>
  );
};

export default DIProvider;
export { DIContext };
