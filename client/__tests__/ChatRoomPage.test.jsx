import React from "react";
import renderer, { act, create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { ChatRoomPage } from "../components/pages/ChatRoomPage";
import { ApiContext } from "../ApiContext";
import { LoginContext } from "../LoginContext";
import { CreateRoomPage } from "../components/pages/CreateRoomPage";

test("render ChatRoomPage", async () => {
  let component;

  await act(async () => {
    component = renderer.create(
      <MemoryRouter>
        <ChatRoomPage />
      </MemoryRouter>,
    );
  });

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("CreateRoomPage", () => {
  it("renders correctly", () => {
    const createRoom = jest.fn();
    const user = { _id: "user123" };

    const component = create(
      <MemoryRouter>
        <ApiContext.Provider value={{ createRoom }}>
          <LoginContext.Provider value={{ user }}>
            <CreateRoomPage />
          </LoginContext.Provider>
        </ApiContext.Provider>
      </MemoryRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
