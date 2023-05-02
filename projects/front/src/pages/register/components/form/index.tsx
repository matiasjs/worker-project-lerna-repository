import { RolesEnum } from "shared-workers";

import InputField from "@/components/InputField";
import { FaKey } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import reactSelectOption from "../../models/react-select-option.type";
import IFormInputs from "../../models/register-form-inputs.interface";

import resolver from "./form.validation";

import {
  ButtonForm,
  FormContainer,
  InputFieldContainer,
  SelectMulti,
} from "./styles";

interface Props {
  guildsSelectOptions?: any;
  rolesSelectOptions?: any;
  rol?: { _id: string; description: RolesEnum };
  onSubmit: SubmitHandler<IFormInputs>;
}

const ReactHookForm = ({ guildsSelectOptions, rol, onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver,
  });

  const isWorker = () => rol?.description === RolesEnum.worker;

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(errors).length ? JSON.stringify(errors) : undefined}

      <InputFieldContainer>
        <InputField
          useFormProps={register("name")}
          placeholder={"general.name"}
          type={"text"}
          icon={<IoPerson />}
          height={50}
        />
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          useFormProps={register("surname")}
          placeholder={"general.surname"}
          type={"text"}
          icon={<IoPerson />}
          height={50}
        />
      </InputFieldContainer>

      {!rol && (
        <InputFieldContainer>
          <InputField
            useFormProps={register("rolId")}
            placeholder={"general.rolID"}
            type={"text"}
            icon={<IoPerson />}
            height={50}
            defaultValue={rol?._id}
          />
        </InputFieldContainer>
      )}

      {isWorker() && (
        <InputFieldContainer>
          <Controller
            name="guildIds"
            control={control}
            render={({ field: { onChange } }) => (
              <InputField
                placeholder={"general.guilds"}
                type={"text"}
                icon={<MdEmail />}
                height={50}
              >
                <SelectMulti
                  classNamePrefix="select_multi"
                  options={guildsSelectOptions}
                  onChange={(opts: reactSelectOption[]) =>
                    onChange(opts.map((c: any) => c.value))
                  }
                  isMulti
                />
              </InputField>
            )}
          />
        </InputFieldContainer>
      )}

      <InputFieldContainer>
        <InputField
          useFormProps={register("email")}
          placeholder={"general.email"}
          type={"text"}
          icon={<MdEmail />}
          height={50}
        />
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          useFormProps={register("password")}
          placeholder={"general.password"}
          type={"password"}
          icon={<FaKey />}
          height={50}
        />
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          useFormProps={register("password")}
          placeholder={"general.password"}
          type={"password"}
          icon={<FaKey />}
          height={50}
        />
      </InputFieldContainer>

      <ButtonForm type="submit" value={"general.submit" || "submit"} />
    </FormContainer>
  );
};

export default ReactHookForm;
