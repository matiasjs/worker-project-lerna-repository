import { useEffect, useState } from "react";
import "./App.css";
import login from "./services/auth.service";

function App() {
  const [accessToken, setAccessToken] = useState<any>("null");

  useEffect(() => {}, []);

  return (
    <div className="App">
      <h2>Access Token:</h2> {accessToken}!
    </div>
  );
}

export default App;
