import { AuthUserLogin } from "../domains/AuthUsers/applications/AuthUsersLogin";
import { AuthUsersAxiosRepository } from "../domains/AuthUsers/infrastructure/AuthAxiosRepository";
import { AxiosConfig } from "../domains/Shared/infrastructure/AxiosConfig";
import { AxiosRepository } from "../domains/Shared/infrastructure/AxiosRepository";
import { WorkersGetAll } from "../domains/Workers/applications/WorkersGetAll";
import { WorkersAxiosRepository } from "../domains/Workers/infrastructure/WorkersAxiosRepository";

const baseURL = "http://localhost:5000/";
const timeout = 5000;
const headers = { "Content-Type": "application/json" };

const axiosConfig = new AxiosConfig(baseURL, timeout, headers);
const axiosRepository = new AxiosRepository(axiosConfig);

const authUsersRepository = new AuthUsersAxiosRepository(axiosRepository);
const workersAxiosRepository = new WorkersAxiosRepository(axiosRepository);

export const authUserLogin = new AuthUserLogin(authUsersRepository);
export const workersGetAll = new WorkersGetAll(workersAxiosRepository);
