import { fetchJSON } from "./components/services/fetchJSON";

// ApiContext for chat related API
export const ApiContext = React.createContext({
  fetchChatRooms: async () => {
    return await fetchJSON("/api/chatrooms");
  },
});