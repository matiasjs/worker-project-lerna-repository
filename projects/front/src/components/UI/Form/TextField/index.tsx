import {
  FieldContainer,
  IconContainer,
  InputContainer,
  Label,
  TextFieldContainer,
} from "./styles";

interface TextFieldI {
  height?: number;
  required: boolean;
  labelText?: string;
}

const TextField = ({ height, required, labelText }: TextFieldI) => {
  return (
    <FieldContainer>
      <Label>{required ? `${labelText} *` : labelText}</Label>
      <TextFieldContainer height={height}>
        <InputContainer />
      </TextFieldContainer>
    </FieldContainer>
  );
};

export default TextField;
