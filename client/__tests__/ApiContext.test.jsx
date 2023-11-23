import React, { useContext } from "react";
import renderer from "react-test-renderer";
import { ApiContext } from "../ApiContext";
const TestingComponent = () => {
  const { fetchChatRooms } = useContext(ApiContext);
  return (
    <div>
      <button onClick={fetchChatRooms}>Fetch some nice Rooms</button>
    </div>
  );
};

describe("ApiContext", () => {
  it("TestComponent renders with context", () => {
    const mockingFetchChatRooms = jest.fn();

    const component = renderer.create(
      <ApiContext.Provider value={{ fetchChatRooms: mockingFetchChatRooms }}>
        <TestingComponent />
      </ApiContext.Provider>,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
