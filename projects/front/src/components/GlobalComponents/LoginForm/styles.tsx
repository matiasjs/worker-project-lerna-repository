import styled from "styled-components";

export const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ErrorMsj = styled.span`
  font-size: 10px;
  color: red;
  margin-left: 12px;
`;

export const LoginInput = styled.input`
  height: 45px;
  border: 1px solid #aaaaaa;
  border-radius: 8px;
  width: 400px;
  padding: 0 24px;
  font-family: " Poppins ";

  &::focus {
    border: 1px solid #aaaaaa;
  }

  input[type="email"] {
    font-family: "Poppins";
    font-size: 32px;
  }
`;

export const ButtonForm = styled.input`
  border: 2px solid #092087;
  background-color: white;
  height: 45px;
  width: 150px;
  font-family: "Poppins";
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f5f4f4;
  }
`;
