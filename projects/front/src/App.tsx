import { useEffect, useState } from "react";
import "./App.css";
import login from "./services/auth.service";
import { authUserLogin } from "./services/factory.service";

function App() {
  const [accessToken, setAccessToken] = useState<any>("null");

  useEffect(() => {
    getLogin();
  }, []);

  const getLogin = async () => {
    await login("username", "password").then(setAccessToken);
  };

  return (
    <div className="App">
      <h2>Access Token:</h2> {accessToken}!
    </div>
  );
}

export default App;
