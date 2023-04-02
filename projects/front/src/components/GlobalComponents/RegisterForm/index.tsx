import {
  ButtonForm,
  FormContainer,
  InputFieldContainer,
  SelectInput,
  SelectMulti,
} from "./styles";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from "./models/schema.yup";
import rolesService from "../../../services/roles.service";
import { useEffect, useState } from "react";
import {
  RolesEnum,
  RolesGetAllOutput,
  SpecializationsGetAllOutput,
} from "shared-workers";
import guildsService from "../../../services/guilds.service";
import IFormInputs from "./models/register-form-inputs.interface";
import InputField from "../../UI/Form/InputField";

import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";

interface Props {
  rol: RolesEnum;
}

const RegisterForm = ({ rol }: Props) => {
  const { t } = useTranslation();

  const [roles, setRoles] = useState<RolesGetAllOutput>([]);
  const [guilds, setGuilds] = useState<SpecializationsGetAllOutput>([]);

  const [guildsSelectOptions, setGuildsSelectOptions] = useState<any[]>([]);
  const [rolesSelectOptions, setRolesSelectOptions] = useState<any[]>([]);

  const { getAllRoles } = rolesService();
  const { getAllGuilds } = guildsService();

  useEffect(() => {
    getAllRoles().then((roles) => {
      setRoles(roles);

      setRolesSelectOptions(
        roles.map((rol) => ({
          value: rol._id,
          label: rol.description,
        }))
      );
    });

    getAllGuilds().then((guilds) => {
      setGuilds(guilds);

      //TODO: move to fn
      setGuildsSelectOptions(
        guilds.map((guild) => ({
          value: guild._id,
          label: guild.description,
        }))
      );
    });
  }, []);

  const resolver = yupResolver(schema);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: {
      name: "",
      surname: "",
      guilds: [],
      rol: {
        label: rol,
        value: rol,
      },
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: IFormInputs) => {
    console.log("DATA", data);
  };

  return (
    <FormContainer onSubmit={handleSubmit((data: any) => onSubmit(data))}>
      <InputFieldContainer>
        <InputField
          placeholder={t("general.name")}
          type={"text"}
          icon={<IoPerson />}
          height={50}
          useFormProps={register("name")}
        />
        {errors.name && <span>{errors.name.message as string}</span>}
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          placeholder={t("general.surname")}
          type={"text"}
          icon={<IoPerson />}
          height={50}
          useFormProps={register("surname")}
        />
        {errors.surname && <span>{errors.surname.message as string}</span>}
      </InputFieldContainer>

      {!rol && (
        <InputFieldContainer>
          <Controller
            name="rol"
            defaultValue={rol}
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                options={rolesSelectOptions}
                className="roles"
                classNamePrefix="select"
              />
            )}
          />
        </InputFieldContainer>
      )}

      {rol === RolesEnum.worker && (
        <InputFieldContainer>
          <Controller
            name="guilds"
            control={control}
            render={({ field }) => (
              <InputField
                placeholder={t("general.guilds")}
                type={"text"}
                icon={<MdEmail />}
                height={50}
              >
                <SelectMulti
                  {...field}
                  options={guildsSelectOptions}
                  placeholder={t("general.guilds")}
                  classNamePrefix="select_multi"
                  isMulti
                />
              </InputField>
            )}
          />
        </InputFieldContainer>
      )}

      <InputFieldContainer>
        <InputField
          placeholder={t("general.email")}
          type={"text"}
          icon={<MdEmail />}
          height={50}
          useFormProps={register("email")}
        />
        {errors.email && <span>{errors.email.message as string}</span>}
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          placeholder={t("general.password")}
          type={"password"}
          icon={<FaKey />}
          height={50}
          useFormProps={register("password")}
        />
        {errors.password && <span>{errors.password.message as string}</span>}
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          placeholder={t("general.password")}
          type={"password"}
          icon={<FaKey />}
          height={50}
          useFormProps={register("passwordConfirmation")}
        />
        {errors.passwordConfirmation && (
          <span>{errors.passwordConfirmation.message as string}</span>
        )}
      </InputFieldContainer>

      <ButtonForm type="submit" value={t("general.submit") || "submit"} />
    </FormContainer>
  );
};

export default RegisterForm;
