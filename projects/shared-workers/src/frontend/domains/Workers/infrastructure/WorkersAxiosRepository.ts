import { RequestRepository } from "../../Shared";
import { Workers } from "../domain/Workers";
import { WorkersRepository } from "../domain/WorkersUserRepository";

export class WorkersAxiosRepository implements WorkersRepository {
  constructor(private readonly axiosInstace: RequestRepository) {}

  getAll(): Promise<Workers[]> {
    throw new Error("Method not implemented.");
  }
}
