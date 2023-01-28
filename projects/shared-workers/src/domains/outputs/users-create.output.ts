export interface UserCreateOutput {
  _id: string;
  name: string;
  email: string;
  password: string;
  surname: string;
  rolid: string;
  specializationid: string;
  rol?: any;
  specialization?: any;
}
