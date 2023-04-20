import { HTMLInputTypeAttribute, ReactElement, useState } from "react";
import { ChildrenContainer, FieldContainer, InputFieldInput } from "./styles";

import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputFieldProps {
  type: HTMLInputTypeAttribute;
  icon: ReactElement;
  placeholder: string;
  required?: boolean;
  height?: number;
  useFormProps?: any;
  children?: ReactElement;
}

const InputField = ({
  type,
  required = true,
  placeholder,
  icon,
  height,
  useFormProps,
  children,
}: InputFieldProps) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [typeState, setTypeState] = useState(type);

  const handleHidePasswordClick = () => {
    setHidePassword(!hidePassword);

    setTypeState(!hidePassword ? "password" : "text");
  };

  if (height && height < 40) {
    height = 40;
  }

  return (
    <FieldContainer id="InputFieldContainer" height={height}>
      {icon}

      {children ? (
        <ChildrenContainer id="asd">{children}</ChildrenContainer>
      ) : (
        <InputFieldInput
          id="InputFieldInput"
          type={typeState}
          required={required}
          placeholder={placeholder}
        />
      )}

      <div onClick={handleHidePasswordClick} style={{ cursor: "pointer" }}>
        {type === "password" && (hidePassword ? <FiEyeOff /> : <FiEye />)}
      </div>
    </FieldContainer>
  );
};

export default InputField;
