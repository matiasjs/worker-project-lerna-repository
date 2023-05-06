import { useI18nContext } from "@/i18n/i18n-react";
import { Project } from "@/models/project.model";
import { getMyOwnProjects } from "@/redux/slices/projects/actions";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProjectCard from "./components/ProjectCard";
import { ProjectsContainer } from "./styles";

const ProjectsPage = () => {
  const { LL } = useI18nContext();

  const ownProjects: Project[] = useSelector((state: any) => state.ownProjects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyOwnProjects());
  }, []);

  return (
    <ProjectsContainer>
      <h1>{LL.projects.tittle()}</h1>

      {ownProjects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </ProjectsContainer>
  );
};

export default ProjectsPage;
