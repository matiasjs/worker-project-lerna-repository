import {
  ButtonForm,
  ErrorMsj,
  FormContainer,
  InputContainer,
  LoginContainer,
  LoginInput,
} from "./styles";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from "./models/schema.yup";
import IFormInputs from "./models/form-inputs.interface";
import usersService from "../../../services/users.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, getLoggedUser } = usersService();

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

  useEffect(() => {
    const loggedUser = getLoggedUser();

    if (loggedUser) {
      navigate("/projects");
    }
  }, []);

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
          <LoginInput
            {...register("email")}
            type="email"
            value={"ringa.matias@gmail.com"}
          />
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
            value={"password"}
          />
        </InputContainer>
        <ButtonForm type="submit" />
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginForm;
