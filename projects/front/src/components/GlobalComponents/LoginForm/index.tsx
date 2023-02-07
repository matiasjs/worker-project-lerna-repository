<<<<<<< HEAD
import {
  ButtonForm,
  ErrorMsj,
  FormContainer,
  InputContainer,
  LoginContainer,
  LoginInput,
} from "./styles";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
=======
import { ErrorMsj, FormContainer, LoginContainer } from "./styles";
import { FieldValues, useForm } from "react-hook-form";
>>>>>>> 261f1b9390c8e8079a7f9212a55be3ec619e1b1e
import { yupResolver } from "@hookform/resolvers/yup";

import schema from "./models/schema.yup";
import IFormInputs from "./models/form-inputs.interface";
import usersService from "../../../services/users.service";

const LoginForm = () => {
  const { login } = usersService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // TODO: arreglar el tipo de este data
  const onSubmit = async (data: IFormInputs | FieldValues) => {
    await login(data.email, data.password);
  };

  return (
    <LoginContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <label>
            Email{" "}
            <ErrorMsj>
              {errors.email && <span>This field is required</span>}
            </ErrorMsj>
          </label>
          <LoginInput {...register("email")} type="email" />
        </InputContainer>
        <InputContainer>
          <label>
            Constraseña
            <ErrorMsj>
              {errors.password && <span>This field is required</span>}
            </ErrorMsj>
          </label>
          <LoginInput
            {...register("password", { required: true })}
            type="password"
          />
        </InputContainer>
        <ButtonForm type="submit" />
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginForm;
