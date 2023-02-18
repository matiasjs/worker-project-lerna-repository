import { RolesEnum } from "shared-workers";
import RegisterForm from "../../components/GlobalComponents/RegisterForm";

const RegisterPage = ({ rol }: { rol: RolesEnum }) => {
  return <RegisterForm rol={rol} />;
};

export default RegisterPage;
