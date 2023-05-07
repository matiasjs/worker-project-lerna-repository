import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { Provider } from "react-redux";

import TypesafeI18n from "@/i18n/i18n-react";
import { loadLocale } from "@/i18n/i18n-util.sync";
import ProjectsPage from "@/pages/projects/index.page";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("Projects Page", () => {
  const middlewares = [thunk];
  const initialState = { ownProjects: [] };
  const mockStore = configureStore(middlewares);
  loadLocale("es");

  it("Testing a page", () => {
    const res = render(
      <TypesafeI18n locale={"es"}>
        <Provider store={mockStore(initialState)}>
          <ProjectsPage />
        </Provider>
      </TypesafeI18n>
    );

    const h1 = res.container.querySelector("h1");

    expect(h1.textContent).toBe("PROJECTOS");
  });
});
