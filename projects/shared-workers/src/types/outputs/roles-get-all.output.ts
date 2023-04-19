export interface RolesGetAllOutput extends Array<RolGetAllOutput> {}

interface RolGetAllOutput {
  _id: string;
  description: string;
}
