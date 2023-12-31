import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { CreateRoomPage } from "../components/pages/CreateRoomPage";
import { AboutPage } from "../components/pages/AboutPage";
import { EditChatRoomPage } from "../components/pages/EditChatRoomPage";
import { ProfilePage } from "../components/pages/ProfilePage";

test("render AboutPage", () => {
  const component = renderer.create(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("render CreateRoomPage", () => {
  const component = renderer.create(
    <MemoryRouter>
      <CreateRoomPage />
    </MemoryRouter>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("render EditChatRoomPage", () => {
  const component = renderer.create(
    <MemoryRouter>
      <EditChatRoomPage />
    </MemoryRouter>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("render ProfilePage", () => {
  const component = renderer.create(
    <MemoryRouter>
      <ProfilePage />
    </MemoryRouter>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
