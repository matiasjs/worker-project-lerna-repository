import httpRequester from "@/utils/httpRequester";
import { RolesGetAllOutput } from "shared-workers";

const getAllRoles = async (): Promise<RolesGetAllOutput> => {
  const accessToken = localStorage.getItem("access-token");
  return httpRequester
    .get("v1/roles", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response: { data: RolesGetAllOutput }) => response.data);
};

const rolesService = {
  getAllRoles,
};

export default rolesService;
