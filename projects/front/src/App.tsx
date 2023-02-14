import "./App.css";
import DIProvider from "./contexts/dependency-injection.context";
import AppRoutes from "./Routes";

function App() {
  return (
    <DIProvider>
      <AppRoutes />
    </DIProvider>
  );
}

export default App;
