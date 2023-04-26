export interface UserGetByEmailOutput {
  _id: string;
  name: string;
  email: string;
  surname: string;
  rank: number;
  rolId: string;
  specializationsId: string[];
  rol?: any;
  specializations?: any[];
}
