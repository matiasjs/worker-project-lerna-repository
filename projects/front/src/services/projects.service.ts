import { DIContext } from "../contexts/dependency-injection.context";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { GetMyOwnProjects } from "../domains/Projects/applications/GetMyOwnProjects";
import { ProjectsGetManyOutput } from "shared-workers";

const projectsService = () => {
  const navigate = useNavigate();

  const { projectsAxiosRepository, webStorageRepository } =
    useContext(DIContext);

  const _getMyOwnProjects = new GetMyOwnProjects(projectsAxiosRepository);

  const getMyOwnProjects = async (): Promise<ProjectsGetManyOutput[]> => {
    const accessToken: string = webStorageRepository.get("access_token");

    const projects = await _getMyOwnProjects
      .invoke(accessToken)
      .catch((error) => {
        // TODO: necesitamos mover esto a todas las peticiones, pero sin el axios interceptor
        if (error?.response?.status === 401) {
          webStorageRepository.delete("access_token");
          navigate("/login");
        }

        return [];
      });

    webStorageRepository.save("myOwnProjects", projects.toString());

    return projects;
  };

  return { getMyOwnProjects };
};

export default projectsService;
