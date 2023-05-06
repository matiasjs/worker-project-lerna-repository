import { Address } from "../Address";

export interface ProjectsCreateUsersOutput {
  _id: string;
  name: string;
  email: string;
  password: string;
  surname: string;
  rank: number;
  rolId: string;
  specializationsId: string[];
  rol: any;
  specializations: any[];
}

export interface ProjectsCreateWorkersOutput {
  workerId: string;
  worker?: ProjectsCreateUsersOutput;
  budget?: number;
  stars?: number;
  opinion?: string;
}

export interface ProjectsCreateOutput {
  _id: string;
  name: string;
  address: Address;
  ownerId: string;
  description: string;
  workers: ProjectsCreateWorkersOutput[];
}
