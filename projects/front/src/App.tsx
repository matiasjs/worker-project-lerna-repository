import "./App.css";
import DIProvider from "./contexts/dependency-injection.context";
import AppRoutes from "./Routes";

import { resources } from "shared-workers";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

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
        <AppRoutes />
      </DIProvider>
    </>
  );
}

export default App;
