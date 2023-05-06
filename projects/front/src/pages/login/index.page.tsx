import InputField from "@/components/InputField";
import { login } from "@/redux/slices/auth/actions";
import { t } from "i18next";
import { useRouter } from "next/router";
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { useAppDispatch } from "@/redux/store";
import { getCookie } from "@/utils/useCookies";
import { useEffect } from "react";
import {
  ButtonForm,
  FormCard,
  FormContainer,
  InputFieldContainer,
} from "./styles";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // TODO: arreglar el tipo de este data
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        router.push("/projects");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (getCookie("access-token")) {
      router.push("/projects");
    }
  }, []);

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

export default LoginPage;
