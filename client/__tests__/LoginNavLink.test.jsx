import React from "react";
import renderer, { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { LoginContext } from "../LoginContext";
import { LoginNavLink } from "../components/login/LoginNavLink";

describe("LoginNavLink", () => {
  it("renders when user logged in", () => {
    const user = { email: "ola@nordmannen.com" };

    let component;
    act(() => {
      component = renderer.create(
        <MemoryRouter>
          <LoginContext.Provider value={{ user }}>
            <LoginNavLink />
          </LoginContext.Provider>
        </MemoryRouter>,
      );
    });

    expect(component).toMatchSnapshot();
  });

  it("no render when not logged in", () => {
    let component;
    act(() => {
      component = renderer.create(
        <MemoryRouter>
          <LoginContext.Provider value={{ user: null }}>
            <LoginNavLink />
          </LoginContext.Provider>
        </MemoryRouter>,
      );
    });

    expect(component.toJSON()).toBeNull();
  });
});
