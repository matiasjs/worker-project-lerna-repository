import styled from "styled-components";

interface TextFieldContainerI {
  height: string;
}

export const FieldContainer = styled.div<{ height?: number }>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 12px 0;

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Label = styled.label``;

export const TextFieldContainer = styled.div<TextFieldContainerI>`
  height: ${({ height }) => (height ? height : "35px")};
  width: 100%;
  border: 2px solid #9b9898;
  background-color: #5e5e5e1c;
  border-radius: 8px;
`;

export const InputContainer = styled.input`
  height: 100%;
  width: 100%;
`;

InputContainer;
export const IconContainer = styled.div``;
