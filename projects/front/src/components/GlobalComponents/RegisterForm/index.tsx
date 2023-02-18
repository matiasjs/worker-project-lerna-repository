import {
  ButtonForm,
  ErrorMsj,
  FormContainer,
  InputContainer,
  LoginContainer,
  LoginInput,
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    console.log("DATA", data);
  };

  return (
    <LoginContainer>
      <FormContainer onSubmit={handleSubmit((data: any) => onSubmit(data))}>
        <InputContainer>
          <label>
            {t("general.name")}{" "}
            <ErrorMsj>
              {errors.name && <span>{errors.name.message as string}</span>}
            </ErrorMsj>
          </label>
          <LoginInput {...register("name")} type="text" />
        </InputContainer>

        <InputContainer>
          <label>
            Surname{" "}
            <ErrorMsj>
              {errors.surname && (
                <span>{errors.surname.message as string}</span>
              )}
            </ErrorMsj>
          </label>
          <LoginInput {...register("surname")} type="text" />
        </InputContainer>

        {!rol && (
          <InputContainer>
            <label>
              Rol{" "}
              <ErrorMsj>
                {errors.rol && <span>{errors.rol.message as string}</span>}
              </ErrorMsj>
            </label>

            <Controller
              name="rol"
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
          </InputContainer>
        )}

        {rol === RolesEnum.worker && (
          <InputContainer>
            <label>
              Guilds{" "}
              <ErrorMsj>
                {errors.guilds && (
                  <span>{errors.guilds.message as string}</span>
                )}
              </ErrorMsj>
            </label>
            <Controller
              name="guilds"
              control={control}
              render={({ field }) => (
                <SelectMulti
                  {...field}
                  options={guildsSelectOptions}
                  className="guilds"
                  classNamePrefix="select"
                  isMulti
                />
              )}
            />
          </InputContainer>
        )}

        <InputContainer>
          <label>
            Email{" "}
            <ErrorMsj>
              {errors.email && <span>{errors.email.message as string}</span>}
            </ErrorMsj>
          </label>
          <LoginInput {...register("email")} type="email" />
        </InputContainer>

        <InputContainer>
          <label>
            Constraseña
            <ErrorMsj>
              {errors.password && (
                <span>{errors.password.message as string}</span>
              )}
            </ErrorMsj>
          </label>
          <LoginInput
            {...register("password", { required: true })}
            type="password"
          />
        </InputContainer>

        {/* <InputContainer>
          <label>
            Re-Password
            <ErrorMsj>
              {errors.passwordConfirmation && (
                <span>{errors.passwordConfirmation.message as string}</span>
              )}
            </ErrorMsj>
          </label>
          <LoginInput
            {...register("passwordConfirmation", { required: true })}
            type="password"
          />
        </InputContainer> */}

        <ButtonForm type="submit" />
      </FormContainer>
    </LoginContainer>
  );
};

export default RegisterForm;
