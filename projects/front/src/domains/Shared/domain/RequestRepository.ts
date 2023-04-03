export abstract class RequestRepository {
  abstract get(url: string, config?: any): Promise<any>;
  abstract post(url: string, data?: any, config?: any): Promise<any>;
  abstract put(url: string, data?: any, config?: any): Promise<any>;
  abstract delete(url: string, config?: any): Promise<any>;
}
