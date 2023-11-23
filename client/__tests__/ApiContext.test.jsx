import React, { useContext } from "react";
import renderer from "react-test-renderer";
import { ApiContext } from "../ApiContext";

const TestingComponent = () => {
  const {
    fetchChatRooms,
    createRoom,
    fetchChatRoomById,
    updateChatRoom,
    deleteRoom,
    fetchMessages,
    postMessage,
  } = useContext(ApiContext);

  return (
    <div>
      <button onClick={fetchChatRooms}>Fetch Rooms</button>
      <button onClick={() => createRoom({ name: "BEST Room" })}>
        Create Room
      </button>
      <button onClick={() => fetchChatRoomById("HAHAHA")}>
        Fetch Room By ID
      </button>
      <button
        onClick={() => updateChatRoom("HAHAHA", { name: "Updated Room" })}
      >
        Update Room
      </button>
      <button onClick={() => deleteRoom("HAHAHA")}>Delete Room</button>
      <button onClick={() => fetchMessages("HAHAHA")}>Fetch Messages</button>
      <button onClick={() => postMessage("HAHAHA", { text: "New Message" })}>
        Post Message
      </button>
    </div>
  );
};

describe("ApiContext", () => {
  it("TestingComponent W/ context", () => {
    const mockFunctions = {
      fetchChatRooms: jest.fn(),
      createRoom: jest.fn(),
      fetchChatRoomById: jest.fn(),
      updateChatRoom: jest.fn(),
      deleteRoom: jest.fn(),
      fetchMessages: jest.fn(),
      postMessage: jest.fn(),
    };

    const component = renderer.create(
      <ApiContext.Provider value={mockFunctions}>
        <TestingComponent />
      </ApiContext.Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
