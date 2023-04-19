import { ButtonForm, InputFieldContainer, FormContainer } from "./styles";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from "./models/schema.yup";
import IFormInputs from "./models/form-inputs.interface";
import usersService from "../../../services/users.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import InputField from "../../UI/Form/InputField";

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

    console.log("loggedUser", loggedUser);

    if (loggedUser) {
      navigate("/projects");
    }
  }, []);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <InputFieldContainer>
        <InputField
          placeholder={t("general.email")}
          type={"text"}
          icon={<MdEmail />}
          height={50}
          useFormProps={register("email")}
        />
        {errors.email && <span>{errors.email.message as string}</span>}
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          placeholder={t("general.password")}
          type={"password"}
          icon={<FaKey />}
          height={50}
          useFormProps={register("password")}
        />
        {errors.password && <span>{errors.password.message as string}</span>}
      </InputFieldContainer>

      <ButtonForm type="submit" value={t("general.submit") || "submit"} />
    </FormContainer>
  );
};

export default LoginForm;
