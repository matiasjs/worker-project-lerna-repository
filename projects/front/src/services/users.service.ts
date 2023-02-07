import { AuthUserLogin, AuthUserLogout } from "shared-workers";
import { DIContext } from "../contexts/dependency-injection.context";
import { useContext } from "react";

const usersService = () => {
  const { authUsersRepository, webStorageRepository } = useContext(DIContext);

  const authUserLogin = new AuthUserLogin(authUsersRepository);
  const authUserLogout = new AuthUserLogout(authUsersRepository);

  const login = async (email: string, password: string) => {
    const { accessToken } = await authUserLogin.invoke(email, password);

    webStorageRepository.save("access_token", accessToken);

    return accessToken;
  };

  const logout = async () => {
    await authUserLogout.invoke();

    webStorageRepository.delete("access_token");
  };

  return { login, logout };
};

export default usersService;
