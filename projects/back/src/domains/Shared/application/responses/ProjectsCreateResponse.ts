export interface ProjectsCreateWorkerResponse {
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

export interface ProjectsCreateResponse {
  _id: any;
  name: string;
  description: string;
  ownerId: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    number: string;
    zip_code: string;
    floor: string;
    tower: string;
    department: string;
  };
  workersIds: string[];
  workers: ProjectsCreateWorkerResponse[];
}
