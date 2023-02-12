export interface AuthUserResponse {
  _id?: any;
  email: string;
  name: string;
  surname: string;
  rank: number;
  rolid: string;
  rol?: {
    _id: string;
    description: string;
  };
  specializationsId: string[];
  specializations?: {
    _id: string;
    description: string;
  }[];
}
