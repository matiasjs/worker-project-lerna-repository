import Proyect from "./Proyect";
import useState from "react";
import {
  AddNew,
  HomeContainer,
  HomeHeader,
  HomeTitle,
  ProyectsContainer,
  SearchAndAdd,
  SearchContainer,
} from "./styles";

const Home = () => {
  const [p, setP] = useState(true);
  const proyectos = [{ id: 2, content: "hola" }];

  return (
    <HomeContainer>
      <HomeHeader>
        <HomeTitle>Proyectos</HomeTitle>
        <SearchAndAdd>
          <SearchContainer>
            <input type="text" />
          </SearchContainer>
          <AddNew>+</AddNew>
        </SearchAndAdd>
      </HomeHeader>

      <ProyectsContainer>
        {p &&
          proyectos.map((proyecto) => {
            <Proyect key={proyecto.id} content={proyecto.content} />;
          })}
      </ProyectsContainer>
    </HomeContainer>
  );
};

export default Home;
