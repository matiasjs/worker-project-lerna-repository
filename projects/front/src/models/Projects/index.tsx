import { ProjectsGetManyOutput } from "shared-workers";

export interface Project extends ProjectsGetManyOutput {}

export const ProjectsEmptyState: Project = {
  _id: "",
  name: "",
  description: "",
  workers: [],
  ownerId: "",
  address: {
    city: "",
    country: "",
    department: "",
    floor: "",
    number: "",
    state: "",
    street: "",
    tower: "",
    zip_code: "",
  },
};
