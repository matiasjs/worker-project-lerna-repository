export interface InsertUserResponse {
  _id?: any;
  email: string;
  password: string;
  name: string;
  surname: string;
  rank: number;
  rolId: string;
  specializationsId: string[];
  specializations?: {
    _id: any;
    description: string;
  }[];
  rol?: {
    _id?: any;
    description: string;
  };
}
