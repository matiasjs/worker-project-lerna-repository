import { ErrorMsj, FormContainer, LoginContainer } from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import login from "../../../services/auth.service";

interface IFormInputs {
  email: string;
  password: number;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  })
  .required();

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
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
