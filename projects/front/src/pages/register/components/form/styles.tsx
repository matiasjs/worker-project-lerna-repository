import styled from "@emotion/styled";
import Select from "react-select";

export const SelectInput = styled(Select)`
  height: 100%;
  width: 100%;

  .select__control {
    //TODO: revisar esta crotada
    border: none;
    height: 100%;
    width: 100%;
  }
`;

export const SelectMulti = styled(Select)`
  height: 100%;
  width: 100%;

  .select__control {
    //TODO: revisar esta crotada
    border: none;
    height: 100%;
    width: 100%;
  }
`;

export const InputFieldContainer = styled.div`
  width: 100%;
  text-align: center;

  span {
    align-self: flex-start;
    color: red;
    font-size: 0.8em;
  }
`;

export const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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

  &::focus {
    border: 1px solid #aaaaaa;
  }

  input[type="email"] {
    font-size: 32px;
  }
`;

export const ButtonForm = styled.input`
  font-size: 20px;
  color: #fff;
  background-color: #56cee7;
  width: 100%;
  border: none;
  height: 45px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 2px 2px 6px 0px rgb(0 0 0 / 8%);
  transition: box-shadow 1s ease-in-out;

  &:hover {
    background-color: #52c6de;
  }

  &:active {
    box-shadow: 0px 0px 0px rgb(0 0 0 / 8%);
  }
`;
