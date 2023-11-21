import React from "react";
import { postJSON } from "./components/apiRequests/postJSON";
import { fetchJSON } from "./components/apiRequests/fetchJSON";
import { putJSON } from "./components/apiRequests/putJSON";

// ApiContext for chat related API
export const ApiContext = React.createContext({
  fetchChatRooms: async () => {
    return await fetchJSON("/api/chatroom");
  },
  createRoom: async (roomData) => {
    return await postJSON("/api/chatroom/add", roomData);
  },
  fetchChatRoomById: async (roomId) => {
    return await fetchJSON(`/api/chatroom/${roomId}`);
  },
  updateChatRoom: async (roomId, roomData) => {
    return await putJSON(`/api/chatroom/${roomId}`, roomData);
  },
});