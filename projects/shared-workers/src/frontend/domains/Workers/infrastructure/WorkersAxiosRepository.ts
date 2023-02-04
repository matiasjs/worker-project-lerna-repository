import { Workers } from "../domain/Workers";
import { WorkersRepository } from "../domain/WorkersUserRepository";
import { AxiosRepository } from "../../Shared/infrastructure/AxiosRepository";

export class WorkersAxiosRepository implements WorkersRepository {
  constructor(private readonly axiosInstace: AxiosRepository) {}

  getAll(): Promise<Workers[]> {
    throw new Error("Method not implemented.");
  }
}
