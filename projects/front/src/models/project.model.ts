export interface ProjectUsers {
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

export interface ProjectWorkers {
  workerId: string;
  worker?: ProjectUsers;
  budget?: number;
  stars?: number;
  opinion?: string;
}

export interface Project {
  _id: string;
  name: string;
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
  ownerId: string;
  description: string;
  workers: ProjectWorkers[];
}
