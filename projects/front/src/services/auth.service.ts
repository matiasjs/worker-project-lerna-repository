import { authUserLogin } from "./factory.service";

const login = async (email: string, password: string) => {
  return authUserLogin.invoke(email, password);
};

export default login;
