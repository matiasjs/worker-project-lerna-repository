import { WebStorageRepository } from "../domain/WebStorageRepository";

export class LocalStorageRepository implements WebStorageRepository {
  constructor() {}

  save(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get<T>(key: string): T {
    let data = localStorage.getItem(key);

    if (typeof data !== "string") {
      throw new Error("Data is null");
    }

    try {
      data = JSON.parse(data);
    } catch (error) {
      console.log(`LocalStorageRepository - get - ${data} - ${error}`);
    }

    return data as T;
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }
}
