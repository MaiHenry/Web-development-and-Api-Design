import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../ApiContext";
import { LoginContext } from "../../LoginContext";

function ChatRoomCard({ room, onDelete, onEdit, onEnterRoom }) {
  const { user } = useContext(LoginContext);

  let roomSettings = null;
  if (user && user.email === room.userEmail) {
    roomSettings = (
      <>
        <button onClick={() => onEdit(room._id)}>Edit</button>
        <button onClick={() => onDelete(room._id)}>Delete</button>
      </>
    );
  }

  return (
    <div>
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <button onClick={() => onEnterRoom(room._id)}>Enter Room</button>
      {roomSettings}
    </div>
  );
}

export function ChatRoomPage() {
  const [chatRooms, setChatRooms] = useState([]);
  const { fetchChatRooms, deleteRoom } = useContext(ApiContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loginMethod } = useContext(LoginContext);

  useEffect(() => {
    setIsLoading(true);
    fetchChatRooms()
      .then((data) => {
        setChatRooms(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [fetchChatRooms]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDeleteRoom = (chatRoomId) => {
    deleteRoom(chatRoomId)
      .then(() => {
        setChatRooms((prevRooms) =>
          prevRooms.filter((room) => room._id !== chatRoomId)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCreateRoom = () => {
    navigate("/create");
  };

  function editRoom(chatRoomId) {
    navigate(`/edit/${chatRoomId}`);
  }

  const enterRoom = (chatRoomId) => {
    navigate(`/chatroom/${chatRoomId}`);
  };

  return (
    <div>
      <h2>Available rooms</h2>
      <div className="line"></div>
      <ul>
        {chatRooms.map((room) => (
          <ChatRoomCard
            key={room._id}
            room={room}
            onEnterRoom={enterRoom}
            onEdit={editRoom}
            onDelete={() => handleDeleteRoom(room._id)}
          />
        ))}
      </ul>
      {loginMethod === "microsoft" && (
        <div>
          <div className="spacer"></div>
          <p>Create your own community!</p>
          <div className="spacer"></div>
          <button onClick={handleCreateRoom}>Create new room</button>
        </div>
      )}
    </div>
  );
}
