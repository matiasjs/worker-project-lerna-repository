export interface AuthUserResponse {
  _id?: any;
  email: string;
  name: string;
  surname: string;
  rolid: string;
  rol?: {
    _id: string;
    description: string;
  };
  specializationid: string;
  specialization?: {
    _id: string;
    description: string;
  };
}
