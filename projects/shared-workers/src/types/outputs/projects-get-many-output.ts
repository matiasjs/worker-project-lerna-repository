import { Address } from "../Address";

export interface ProjectsGetManyUsersOutput {
  _id: string;
  name: string;
  email: string;
  password: string;
  surname: string;
  rank: number;
  rolId: string;
  specializationsId: string[];
  rol?: any;
  specializations?: any[];
}

export interface ProjectsGetManyWorkersOutput {
  workerId: string;
  worker?: ProjectsGetManyUsersOutput;
  budget?: number;
  stars?: number;
  opinion?: string;
}

export interface ProjectsGetManyOutput {
  _id?: string;
  name: string;
  address: Address;
  ownerId: string;
  description: string;
  workers?: ProjectsGetManyWorkersOutput[];
}
