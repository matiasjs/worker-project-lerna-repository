export interface UserGetByEmailOutput {
  _id: string;
  name: string;
  email: string;
  surname: string;
  rolid: string;
  specializationid: string;
  rol?: any;
  specialization?: any;
}
