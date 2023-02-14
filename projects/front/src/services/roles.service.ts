import { GetAllRoles } from "shared-workers";
import { DIContext } from "../contexts/dependency-injection.context";
import { useContext } from "react";

const rolesService = () => {
  const { rolAxiosRepository, webStorageRepository } = useContext(DIContext);

  const getAllRolesUseCase = new GetAllRoles(rolAxiosRepository);

  const getAllRoles = async () => {
    const roles = await getAllRolesUseCase.invoke();

    webStorageRepository.save("roles", roles.toString());

    return roles;
  };

  return { getAllRoles };
};

export default rolesService;
