import { useNavigate } from "react-router-dom";
import {
  deleteStorage,
  getLocalStorage,
} from "../utilities/webStorage/localstorage.utility";
import { setLocalStorage } from "../utilities/webStorage/localstorage.utility";

const usersService = () => {
  const navigate = useNavigate();

  const getLoggedUser = (): string | void => {
    return getLocalStorage<string>("access_token");
  };

  const registerUser = async (params: any): Promise<void> => {
    return params;
  };

  const login = async (email: string, password: string) => {
    setLocalStorage("access_token", `${email}/${password}`);

    navigate("/projects");
  };

  const logout = async () => {
    deleteStorage("access_token");
  };

  return { login, logout, registerUser, getLoggedUser };
};

export default usersService;
