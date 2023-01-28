import TextField from "../../UI/Form/TextField";
import { LoginContainer } from "./styles";
// import { TextField } from "../../UI/Form/TextField/index";

const LoginForm = () => {
  return (
    <LoginContainer>
      <form>
        <TextField required labelText="Email" />
      </form>
    </LoginContainer>
  );
};

export default LoginForm;
