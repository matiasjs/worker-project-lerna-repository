export interface InsertUserResponse {
  _id?: any;
  email: string;
  password: string;
  name: string;
  surname: string;
  rolid: string;
  specializationid: string;
  specialization?: {
    _id: any;
    description: string;
  };
  rol?: {
    _id?: any;
    description: string;
  };
}
