export abstract class WebStorageRepository {
  abstract save(key: string, data: any): void;
  abstract get<T>(key: string): T;
  abstract delete(key: string): void;
}
