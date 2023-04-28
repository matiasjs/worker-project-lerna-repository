import {
  ButtonForm,
  FormContainer,
  InputFieldContainer,
  SelectInput,
  SelectMulti,
} from "./styles";

import { useEffect } from "react";
import { RolesEnum } from "shared-workers";

import InputField from "@/components/InputField";
import { getAllGuilds } from "@/redux/slices/guilds/actions";
import { getAllRoles } from "@/redux/slices/roles/actions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { FaKey } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

interface Props {
  rol: RolesEnum;
}

const RegisterPage = ({ rol }: Props) => {
  const rolesSelectOptions = [];
  const guildsSelectOptions = [];

  const dispatch = useAppDispatch();

  const roles: any[] = useAppSelector((state) => {
    rolesSelectOptions.push(
      ...state.roles.map((rol) => ({
        value: rol._id,
        label: rol.description,
      }))
    );

    return state.roles;
  });

  const guilds: any[] = useAppSelector((state: any) => {
    guildsSelectOptions.push(
      ...state.guilds.map((guild) => ({
        value: guild._id,
        label: guild.description,
      }))
    );

    return state.guilds;
  });

  useEffect(() => {
    dispatch(getAllGuilds());
    dispatch(getAllRoles());
  }, []);

  const onSubmit = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("EVENT", event);
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <InputFieldContainer>
        <InputField
          placeholder={"general.name"}
          type={"text"}
          icon={<IoPerson />}
          height={50}
        />
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          placeholder={"general.surname"}
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
            placeholder={"general.guilds"}
            type={"text"}
            icon={<MdEmail />}
            height={50}
          >
            <SelectMulti
              options={guildsSelectOptions}
              placeholder={"general.guilds"}
              classNamePrefix="select_multi"
              isMulti
            />
          </InputField>
        </InputFieldContainer>
      )}

      <InputFieldContainer>
        <InputField
          placeholder={"general.email"}
          type={"text"}
          icon={<MdEmail />}
          height={50}
        />
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
          placeholder={"general.password"}
          type={"password"}
          icon={<FaKey />}
          height={50}
        />
      </InputFieldContainer>

      <InputFieldContainer>
        <InputField
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

export default RegisterPage;
