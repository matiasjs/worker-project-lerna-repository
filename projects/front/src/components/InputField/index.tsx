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
  defaultValue?: any;
  children?: ReactElement;
}

const InputField = ({
  type,
  required = true,
  placeholder,
  icon,
  height,
  useFormProps,
  defaultValue,
  children,
}: InputFieldProps) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [typeState, setTypeState] = useState(type);

  const handleHidePasswordClick = () => {
    setHidePassword(!hidePassword);

    setTypeState(!hidePassword ? "password" : "text");
  };

  if (height && height < 50) {
    height = 50;
  }

  return (
    <FieldContainer id="InputFieldContainer" height={height}>
      {icon}

      {children ? (
        <ChildrenContainer id="asd">{children}</ChildrenContainer>
      ) : (
        <InputFieldInput
          id={`InputFieldInput${type}`}
          type={typeState}
          required={required}
          placeholder={placeholder}
          value={defaultValue}
          {...useFormProps}
        />
      )}

      <div onClick={handleHidePasswordClick} style={{ cursor: "pointer" }}>
        {type === "password" && (hidePassword ? <FiEyeOff /> : <FiEye />)}
      </div>
    </FieldContainer>
  );
};

export default InputField;
