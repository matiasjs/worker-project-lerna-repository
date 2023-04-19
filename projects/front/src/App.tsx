import "./App.css";
import AppRoutes from "./Routes";

import { translates as resources } from "shared-workers";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LayoutContainer } from "./App.styled";

import { Provider } from "react-redux";
import { store } from "./redux/store";

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
    <Provider store={store}>
      <LayoutContainer id="LayoutContainer">
        <AppRoutes />
      </LayoutContainer>
    </Provider>
  );
}

export default App;
