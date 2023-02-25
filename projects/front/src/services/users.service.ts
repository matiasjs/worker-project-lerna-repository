import {
  AuthUserLogin,
  AuthUserLogout,
  AuthUserRegister,
} from "shared-workers";
import { DIContext } from "../contexts/dependency-injection.context";
import { useContext } from "react";
import { Params } from "./models/register.params";
import { useNavigate } from "react-router-dom";

const usersService = () => {
  const navigate = useNavigate();

  const { authUsersRepository, webStorageRepository } = useContext(DIContext);

  const authUserLogin = new AuthUserLogin(authUsersRepository);
  const authUserLogout = new AuthUserLogout(authUsersRepository);
  const authUserRegister = new AuthUserRegister(authUsersRepository);

  const getLoggedUser = (): string => {
    return webStorageRepository.get("access_token");
  };

  const registerUser = async (params: Params): Promise<void> => {
    const registeredUser = await authUserRegister.invoke(params);
  };

  const login = async (email: string, password: string) => {
    const { accessToken } = await authUserLogin.invoke(email, password);

    webStorageRepository.save("access_token", accessToken);

    navigate("/projects");
  };

  const logout = async () => {
    await authUserLogout.invoke();

    webStorageRepository.delete("access_token");
  };

  return { login, logout, registerUser, getLoggedUser };
};

export default usersService;
