import {
  AuthUserLogin,
  AuthUsersAxiosRepository,
  AxiosConfig,
  AxiosRepository,
  WorkersAxiosRepository,
  WorkersGetAll,
} from "shared-workers";

const baseURL = "http://192.168.0.214:5000/";
const timeout = 5000;
const headers = { "Content-Type": "application/json" };

const axiosConfig = new AxiosConfig(baseURL, timeout, headers);
const axiosRepository = new AxiosRepository(axiosConfig);

const authUsersRepository = new AuthUsersAxiosRepository(axiosRepository);
const workersAxiosRepository = new WorkersAxiosRepository(axiosRepository);

export const authUserLogin = new AuthUserLogin(authUsersRepository);
export const workersGetAll = new WorkersGetAll(workersAxiosRepository);
