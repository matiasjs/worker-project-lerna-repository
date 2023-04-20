import { FieldPathValues } from "react-hook-form/dist/types/path";

export default interface IFormInputs extends FieldPathValues<any, any> {
  name: string;
  surname: string;
  rol: {
    value: string;
    label: string;
  };
  guil: {
    value: string;
    label: string;
  }[];
  email: string;
  password: string;
}
