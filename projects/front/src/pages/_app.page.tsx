import TypesafeI18n from "@/i18n/i18n-react";
import { loadLocale } from "@/i18n/i18n-util.sync";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function App({ Component, pageProps }: AppProps) {
  loadLocale("es");

  return (
    <TypesafeI18n locale={"es"}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </TypesafeI18n>
  );
}
