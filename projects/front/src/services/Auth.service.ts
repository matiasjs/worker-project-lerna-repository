import httpRequester from "@/utils/httpRequester";
import { setCookieOnFrontend } from "@/utils/useCookies";

const register = (email, password) => {
  return httpRequester.post("v1/login", {
    email,
    password,
  });
};

const login = (email, password) => {
  return httpRequester
    .post("v1/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("access-token", response.data.accessToken);
        setCookieOnFrontend("access-token", response.data.accessToken);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
