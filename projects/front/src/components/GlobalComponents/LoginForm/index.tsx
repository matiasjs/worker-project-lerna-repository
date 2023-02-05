import { ErrorMsj, FormContainer, LoginContainer } from "./styles";
import { FieldValues, useForm } from "react-hook-form";
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
        <div>
          <label>
            Email{" "}
            <ErrorMsj>
              {errors.email && <span>This field is required</span>}
            </ErrorMsj>
          </label>
          <input {...register("email")} type="email" />
        </div>
        <div>
          <label>
            Constraseña
            <ErrorMsj>
              {errors.password && <span>This field is required</span>}
            </ErrorMsj>
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
          />
        </div>
        <input type="submit" />
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginForm;
