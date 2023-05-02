import httpRequester from "@/utils/httpRequester";
import { SpecializationsGetAllOutput } from "shared-workers";

const getAllGuilds = async (): Promise<SpecializationsGetAllOutput> => {
  const accessToken = localStorage.getItem("access-token");
  return httpRequester
    .get("v1/guilds", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response: { data: SpecializationsGetAllOutput }) => response.data);
};

const guildsService = {
  getAllGuilds,
};

export default guildsService;
