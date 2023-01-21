import { authUserLogin } from "./factory.service";

const login = async (username: string, password: string) => {
  return authUserLogin.invoke(username, password);
};

export default login;
