import styled from "styled-components";

export const LoginContainer = styled.div``;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  color: #000;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ErrorMsj = styled.span`
  font-size: 10px;
  color: red;
  margin-left: 12px;
`;
