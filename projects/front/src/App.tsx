import { useState } from "react";
import "./App.css";
import Home from "./components/GlobalComponents/Home";
import LoginForm from "./components/GlobalComponents/LoginForm";

function App() {
  const [logged, setLogged] = useState(true);

  return <div className="App">{logged ? <Home /> : <LoginForm />}</div>;
}

export default App;
