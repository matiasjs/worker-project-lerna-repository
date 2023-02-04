import { UserLoginInput } from "shared-workers";
import { Workers } from "./Workers";

export abstract class WorkersRepository {
  // TODO: data: aca tiene que haber un input
  abstract getAll(): Promise<Workers[]>;
}
