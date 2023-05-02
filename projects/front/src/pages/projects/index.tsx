import { Project } from "@/models/project.model";
import { getMyOwnProjects } from "@/redux/slices/projects/actions";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProjectCard from "./components/ProjectCard";
import { ProjectsContainer } from "./styles";

const ProjectsPage = () => {
  const ownProjects: Project[] = useSelector((state: any) => state.ownProjects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyOwnProjects());
  }, []);

  return (
    <ProjectsContainer>
      <h1>PROJECTS</h1>

      {ownProjects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </ProjectsContainer>
  );
};

export default ProjectsPage;
