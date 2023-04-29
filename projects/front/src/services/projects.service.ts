import httpRequester from "@/utils/httpRequester";
import { ProjectsGetManyOutput } from "shared-workers";

const getMyOwnProjects = async (): Promise<ProjectsGetManyOutput[]> => {
  const accessToken = localStorage.getItem("access-token");
  return httpRequester
    .get("v1/projects/myself", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response: { data: ProjectsGetManyOutput[] }) => response.data);
};

const projectsService = {
  getMyOwnProjects,
};

export default projectsService;
