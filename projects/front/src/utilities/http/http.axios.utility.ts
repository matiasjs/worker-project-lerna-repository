import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const get = <T>(url: string, config: AxiosRequestConfig): Promise<T> => {
  return axios.get(url, config).then((res) => res.data as T);
};

export { get };
