import { WorkersRepository } from "../domain/WorkersUserRepository";
import { Workers } from "../domain/Workers";

export class WorkersGetAll {
  constructor(private readonly workersRepository: WorkersRepository) {}

  async invoke(): Promise<Workers[]> {
    const workers = await this.workersRepository.getAll();

    if (!workers.length) {
      throw Error(`LA CONCHA DE TU HERMANA ${JSON.stringify(workers)}`);
    }

    return workers;
  }
}
