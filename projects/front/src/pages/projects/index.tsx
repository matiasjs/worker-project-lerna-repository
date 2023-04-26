import { useSelector } from "react-redux";
import Projects from "./Projects";


const ProjectsPage = () => {
  const { isLoggedIn, user } = useSelector((state: any) => state.auth)

  console.log(isLoggedIn)

  return <>Projects funciona {user.accessToken}</>
};

export default ProjectsPage;
