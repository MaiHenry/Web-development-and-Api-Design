import React from "react";
import renderer from "react-test-renderer";
import { ProfilePage } from "../components/pages/ProfilePage";
import { LoginContext } from "../LoginContext";
import { MemoryRouter } from "react-router-dom";

describe("ProfilePage", () => {
  it("page", () => {
    const mockContext = {
      user: { email: "user@Nordmannen.com", picture: null },
      profileName: "Ola Nordmann",
      customName: "Test",
      customBio: "A bio",
      unloadUser: jest.fn(),
      loadUser: jest.fn(),
    };

    const component = renderer.create(
      <MemoryRouter>
        <LoginContext.Provider value={mockContext}>
          <ProfilePage />
        </LoginContext.Provider>
      </MemoryRouter>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
