import axios, { AxiosResponse } from "axios";
import { deleteCookieOnFrontend } from "./useCookies";

const httpRequester = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 1000,
});

const onFulfilled = (response: AxiosResponse) => {
  return response;
};

const onRejected = (error: any) => {
  if (error.response.status === 401) {
    deleteCookieOnFrontend("access-token");
    window.location.href = "/login";
  }

  return Promise.reject(error);
};

httpRequester.interceptors.response.use(onFulfilled, onRejected);

export default httpRequester;
