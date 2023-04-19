import { useNavigate } from "react-router-dom";
import { Project } from "../models/Projects";

const projectsService = () => {
  const navigate = useNavigate();

  const _getMyOwnProjects = async (): Promise<Project[]> => {
    const projects: Project[] = [];

    return projects;
  };

  return { getMyOwnProjects: _getMyOwnProjects };
};

export default projectsService;
