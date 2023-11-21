import React from "react";
import { postJSON } from "./components/apiRequests/postJSON";
import { fetchJSON } from "./components/apiRequests/fetchJSON";
import { putJSON } from "./components/apiRequests/putJSON";
import { deleteJSON } from "./components/apiRequests/deleteJSON";

export const ApiContext = React.createContext({

 // Api for Chat Rooms
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
  deleteRoom: async (roomId) => {
    return await deleteJSON(`/api/chatroom/${roomId}`);
  },

  // Api for Chat messages
  fetchMessages: async (roomId) => {
    return await fetchJSON(`/api/chatroom/${roomId}/messages`);
  },
  postMessage: async (roomId, messageData) => {
    return await postJSON(`/api/chatroom/${roomId}/messages`, { messageData });
  },
});