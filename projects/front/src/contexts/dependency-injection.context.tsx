import { createContext } from "react";
import {
  AuthUsersAxiosRepository,
  AxiosConfig,
  AxiosRepository,
  LocalStorageRepository,
  WebStorageRepository,
  WorkersAxiosRepository,
} from "shared-workers";

//TODO: move to process.env.
const baseURL = "http://localhost:5000/";
const timeout = 5000;
const headers = { "Content-Type": "application/json" };

const DIContext = createContext({
  workersRepository: {} as WorkersAxiosRepository,
  authUsersRepository: {} as AuthUsersAxiosRepository,
  webStorageRepository: {} as WebStorageRepository,
});

const DIProvider = ({ children }: any) => {
  const axiosConfig = new AxiosConfig(baseURL, timeout, headers);
  const axiosRepository = new AxiosRepository(axiosConfig);
  const authUsersRepository = new AuthUsersAxiosRepository(axiosRepository);
  const workersRepository = new WorkersAxiosRepository(axiosRepository);

  const webStorageRepository = new LocalStorageRepository();

  return (
    <DIContext.Provider
      value={{
        authUsersRepository,
        workersRepository,
        webStorageRepository,
      }}
    >
      {children}
    </DIContext.Provider>
  );
};

export default DIProvider;
export { DIContext };
