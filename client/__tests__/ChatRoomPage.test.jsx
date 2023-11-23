import React from "react";
import renderer, { act } from "react-test-renderer";
import { ChatRoomPage } from "../components/pages/ChatRoomPage";
import { MemoryRouter } from "react-router-dom";

test("render ChatRoomPage", async () => {
  let component;

  await act(async () => {
    component = renderer.create(
      <MemoryRouter>
        <ChatRoomPage />
      </MemoryRouter>
    );
  });

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
