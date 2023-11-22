import React from "react";
import renderer from "react-test-renderer";
import { ChatRoomCard } from "../components/pages/ChatRoomPage";

it("matches snapshot", () => {
  const room = {
    _id: "123456789",
    name: "Test chatRoom",
    description: "Test description",
    userEmail: "test@test.com",
  };

  const component = renderer.create(<ChatRoomCard room={room} />);

  expect(component.toJSON()).toMatchSnapshot();
});
