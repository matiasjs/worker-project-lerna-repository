import setCookie from "@/utils/useCookies";
import axios from "axios";

const API_URL = "http://localhost:5000/";

const register = ( email, password) => {
  return axios.post(API_URL + "v1/login", {
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "v1/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setCookie(response, 'asfASFNKAGsad', response.data.accessToken)
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