import { Address } from "../Address";

export interface ProjectsCreateWorkerInput {
  workerId: string;
}

export interface ProjectsCreateInput {
  name: string;
  address: Address;
  description: string;
  ownerId: string;
  workers?: ProjectsCreateWorkerInput[];
}
