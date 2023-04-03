import { useEffect, useState } from "react";
import { ProjectsContainer } from "./styles";

import { ProjectsCreateOutput, ProjectsGetManyOutput } from "shared-workers";
import ProjectCard from "./ProjectCard";
import projectsService from "../../../services/projects.service";

const Projects = () => {
  const { getMyOwnProjects } = projectsService();

  const [projects, setProjects] = useState<ProjectsGetManyOutput[]>([]);

  useEffect(() => {
    getMyOwnProjects().then((projects: ProjectsGetManyOutput[]) => {
      setProjects(projects);
    });
  }, []);

  return (
    <ProjectsContainer>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </ProjectsContainer>
  );
};

export default Projects;
