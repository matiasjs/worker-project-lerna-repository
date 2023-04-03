import "./App.css";
import DIProvider from "./contexts/dependency-injection.context";
import AppRoutes from "./Routes";

import { translates as resources } from "shared-workers";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LayoutContainer } from "./App.styled";

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  return (
    <>
      <DIProvider>
        <LayoutContainer id="LayoutContainer">
          <AppRoutes />
        </LayoutContainer>
      </DIProvider>
    </>
  );
}

export default App;
