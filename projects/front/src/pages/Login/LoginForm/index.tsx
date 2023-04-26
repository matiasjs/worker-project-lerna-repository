import { ButtonForm, InputFieldContainer, FormContainer } from "./styles";
import { t } from "i18next";
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import InputField from "@/Global Components/Form/InputField";

const LoginForm = () => {
  // const { login } = usersService();


  // TODO: arreglar el tipo de este data
  const onSubmit = async (data: any) => {
    console.log(data);
    // await login(data.email, data.password);
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <InputFieldContainer>
        <InputField
          placeholder={t("general.email")}
          type={"text"}
          icon={<MdEmail />}
          height={50}
        />
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          placeholder={t("general.password")}
          type={"password"}
          icon={<FaKey />}
          height={50}
        />
      </InputFieldContainer>

      <ButtonForm type="submit" value={t("general.submit") || "submit"} />
    </FormContainer>
  );
};

export default LoginForm;
