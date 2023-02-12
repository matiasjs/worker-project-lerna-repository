import { Address } from "../Address";

export interface ProjectsCreateInput {
  name: string;
  address: Address;
  description: string;
  ownerId: string;
  workersIds?: string[];
  workers?: any[];
}
