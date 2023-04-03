import { RolesGetAllOutput } from "shared-workers";
import { DIContext } from "../contexts/dependency-injection.context";
import { useContext } from "react";
import { GetAllRoles } from "../domains/Roles/applications/GetRoles";

const rolesService = () => {
  const { rolAxiosRepository, webStorageRepository } = useContext(DIContext);

  const getAllRolesUseCase = new GetAllRoles(rolAxiosRepository);

  const getAllRoles = async (): Promise<RolesGetAllOutput> => {
    const roles = await getAllRolesUseCase.invoke();

    webStorageRepository.save("roles", roles.toString());

    return roles;
  };

  return { getAllRoles };
};

export default rolesService;
