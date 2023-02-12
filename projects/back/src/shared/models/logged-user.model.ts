export interface LoggedUser {
  _id?: any;
  email: string;
  password: string;
  name: string;
  surname: string;
  rolid: string;
  rol?: {
    _id: string;
    description: string;
  };
  specializationsId: string;
  specializations?: {
    _id: string;
    description: string;
  }[];
}
