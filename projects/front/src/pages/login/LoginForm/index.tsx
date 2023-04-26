import { ButtonForm, InputFieldContainer, FormContainer, FormCard } from "./styles";
import { t } from "i18next";
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import InputField from "@/Global Components/Form/InputField";
import { useDispatch } from "react-redux";
import { login } from "@/redux/Slices/Auth/Actions";
import { useRouter } from "next/router";

const LoginForm = () => {
  const dispatch = useDispatch()
  const router =  useRouter()


  // TODO: arreglar el tipo de este data
  const onSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        router.push("/projects");
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <FormCard>
        <InputFieldContainer>
          <InputField
            placeholder={t("general.email")}
            type={"text"}
            icon={<MdEmail />}
            height={50}
          />
        </InputFieldContainer>
        
          <InputField
            placeholder={t("general.password")}
            type={"password"}
            icon={<FaKey />}
            height={50}
          />
        

        <ButtonForm type="submit" value={t("general.submit") || "submit"} />
      </FormCard>
    </FormContainer>
  );
};

export default LoginForm;
