import { useState } from "react";
import "./App.css";
import Home from "./components/GlobalComponents/Home";
import LoginForm from "./components/GlobalComponents/LoginForm";
import DIProvider from "./contexts/dependency-injection.context";

function App() {
  const [logged, setLogged] = useState(false);

  return (
    <DIProvider>
      <div className="App">{logged ? <Home /> : <LoginForm />}</div>
    </DIProvider>
  );
}

export default App;
