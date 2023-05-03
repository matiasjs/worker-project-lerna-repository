import styled from "@emotion/styled";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
  height: 100vh;
  justify-content: center;
  align-content: center;
  flex-wrap: nowrap;
`;

export const FormCard = styled.div`
  min-height: 250px;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
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
