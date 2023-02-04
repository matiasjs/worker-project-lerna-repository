import axios, { AxiosInstance, RawAxiosRequestConfig } from "axios";
import { AxiosConfig } from "./AxiosConfig";

export class AxiosRepository {
  private readonly axios: AxiosInstance;

  constructor(private readonly config: AxiosConfig) {
    this.config.validate();

    this.axios = axios.create(config);
  }

  async get(url: string, config?: RawAxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  async post(url: string, data?: any, config?: RawAxiosRequestConfig) {
    return this.axios.post(url, data, config);
  }

  async put(url: string, data?: any, config?: RawAxiosRequestConfig) {
    return this.axios.put(url, data, config);
  }

  async delete(url: string, config?: RawAxiosRequestConfig) {
    return this.axios.delete(url, config);
  }
}
