import {
  ButtonForm,
  FormContainer,
  InputFieldContainer,
  SelectInput,
  SelectMulti,
} from "./styles";
import { useTranslation } from "react-i18next";

import rolesService from "../../../services/roles.service";
import { useEffect, useState } from "react";
import {
  RolesEnum,
  RolesGetAllOutput,
  SpecializationsGetAllOutput,
} from "shared-workers";
import guildsService from "../../../services/guilds.service";
import IFormInputs from "./models/register-form-inputs.interface";

import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import InputField from "@/Global Components/Form/InputField";

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

  const onSubmit = async (data: IFormInputs) => {
    console.log("DATA", data);
  };

  return (
    <FormContainer onSubmit={(data: any) => onSubmit(data)}>
      <InputFieldContainer>
        <InputField
          placeholder={t("general.name")}
          type={"text"}
          icon={<IoPerson />}
          height={50}
        />
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          placeholder={t("general.surname")}
          type={"text"}
          icon={<IoPerson />}
          height={50}
        />
      </InputFieldContainer>

      {!rol && (
        <InputFieldContainer>
          <SelectInput
            options={rolesSelectOptions}
            className="roles"
            classNamePrefix="select"
          />
        </InputFieldContainer>
      )}

      {rol === RolesEnum.worker && (
        <InputFieldContainer>
          <InputField
            placeholder={t("general.guilds")}
            type={"text"}
            icon={<MdEmail />}
            height={50}
          >
            <SelectMulti
              options={guildsSelectOptions}
              placeholder={t("general.guilds")}
              classNamePrefix="select_multi"
              isMulti
            />
          </InputField>
        </InputFieldContainer>
      )}

      <InputFieldContainer>
        <InputField
          placeholder={t("general.email")}
          type={"text"}
          icon={<MdEmail />}
          height={50}
        />
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          placeholder={t("general.password")}
          type={"password"}
          icon={<FaKey />}
          height={50}
        />
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          placeholder={t("general.password")}
          type={"password"}
          icon={<FaKey />}
          height={50}
        />
      </InputFieldContainer>

      <ButtonForm type="submit" value={t("general.submit") || "submit"} />
    </FormContainer>
  );
};

export default RegisterForm;
