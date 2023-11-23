import React from "react";
import renderer, { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { LoginContext } from "../LoginContext";
import { LoginFooter } from "../components/login/LoginFooter";

describe("LoginFooter", () => {
  it("renders when user logged in", () => {
    const user = { email: "ola@nordmannen.com" };

    let component;
    act(() => {
      component = renderer.create(
        <MemoryRouter>
          <LoginContext.Provider value={{ user, profileName: "Ola" }}>
            <LoginFooter />
          </LoginContext.Provider>
        </MemoryRouter>
      );
    });

    expect(component).toMatchSnapshot();
  });

  it("renders when user logged in", () => {
    let component;
    act(() => {
      component = renderer.create(
        <MemoryRouter>
          <LoginContext.Provider value={{ user: null }}>
            <LoginFooter />
          </LoginContext.Provider>
        </MemoryRouter>
      );
    });

    expect(component).toMatchSnapshot();
  });
});
