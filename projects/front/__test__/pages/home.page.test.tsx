import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { Provider } from "react-redux";

import TypesafeI18n from "@/i18n/i18n-react";
import { loadLocale } from "@/i18n/i18n-util.sync";
import Home from "@/pages/index.page";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const useRouter = jest.spyOn(require("next/navigation"), "useRouter");

describe("Home Page", () => {
  const middlewares = [thunk];
  const initialState = { ownProjects: [] };
  const mockStore = configureStore(middlewares);
  loadLocale("es");

  useRouter.mockImplementationOnce(() => ({
    push: console.log,
  }));

  it("Testing a page", () => {
    const res = render(
      <TypesafeI18n locale={"es"}>
        <Provider store={mockStore(initialState)}>
          <Home />
        </Provider>
      </TypesafeI18n>
    );

    const button = res.getByRole("button");

    expect((button as any).value).toBe("submit");
  });
});
