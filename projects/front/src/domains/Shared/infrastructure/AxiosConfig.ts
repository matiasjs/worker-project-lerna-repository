import { InvalidArgumentError } from "shared-workers";

export class AxiosConfig {
  constructor(
    readonly baseURL: string,
    readonly timeout: number,
    readonly headers: any
  ) {}

  static fromPrimitives(plainData: {
    baseURL: string;
    timeout: number;
    headers: any;
  }): AxiosConfig {
    return new AxiosConfig(
      plainData.baseURL,
      plainData.timeout,
      plainData.headers
    );
  }

  validate(): void {
    if (!this.baseURL) {
      throw new InvalidArgumentError(`AxiosConfig baseURL is undefined`);
    }
  }
}
