import { useEffect } from "react";
import { RolesEnum } from "shared-workers";

import { getAllGuilds } from "@/redux/slices/guilds/actions";
import { getAllRoles } from "@/redux/slices/roles/actions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ReactHookForm from "./components/form";
import { RegisterPageContainer } from "./styles";

const RegisterPage = () => {
  const rolesSelectOptions = [];
  const guildsSelectOptions = [];
  let rol;

  const dispatch = useAppDispatch();

  const roles: any[] = useAppSelector((state) => {
    rolesSelectOptions.push(
      ...state.roles.map((rol) => ({
        value: rol._id,
        label: rol.description,
      }))
    );

    rol = state.roles.find((rol) => rol.description === RolesEnum.worker);
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

  const onSubmit = async (data) => {
    console.log("DATA", data);
  };

  return (
    <RegisterPageContainer>
      <ReactHookForm
        onSubmit={onSubmit}
        rol={rol}
        rolesSelectOptions={rolesSelectOptions}
        guildsSelectOptions={guildsSelectOptions}
      ></ReactHookForm>
    </RegisterPageContainer>
  );
};

export default RegisterPage;
