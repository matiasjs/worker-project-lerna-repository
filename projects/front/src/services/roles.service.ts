import { Roles } from "../models/Roles";
import { setLocalStorage } from "../utilities/webStorage/localstorage.utility";

const rolesService = () => {
  const _getAllRoles = async (): Promise<Roles> => {
    const roles: Roles = [];

    setLocalStorage("roles", roles);

    return roles;
  };

  return { getAllRoles: _getAllRoles };
};

export default rolesService;
