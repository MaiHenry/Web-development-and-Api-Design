import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiContext } from "../../ApiContext";
import { LoginContext } from "../../LoginContext";

export function EditChatRoomPage() {
  const { fetchChatRoomById, updateChatRoom } = useContext(ApiContext);
  const { user } = useContext(LoginContext);
  const navigate = useNavigate();
  const { chatRoomId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (chatRoomId) {
      fetchChatRoomById(chatRoomId)
        .then((room) => {
          setName(room.name);
          setDescription(room.description);
        })
        .catch((error) => {
          console.error("Error getting chat room:", error);
        });
    }
  }, [chatRoomId, fetchChatRoomById]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateChatRoom(chatRoomId, {
        name,
        description,
        userEmail: user.email,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <form className="object-form" onSubmit={handleSubmit}>
      <h2>Edit Room</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Update Room</button>
    </form>
  );
}