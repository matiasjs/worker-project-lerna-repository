import { ProjectsGetManyOutput } from "shared-workers";
import { ProjectCardContainer } from "./styles";

export interface Props {
  project: ProjectsGetManyOutput;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <ProjectCardContainer>
      <div>{project._id}</div>
      <div>{project.name}</div>
      <div>Workers: {project.workers?.length}</div>
    </ProjectCardContainer>
  );
};

export default ProjectCard;
