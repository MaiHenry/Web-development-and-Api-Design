import React, { useContext, useState } from "react";
import { ApiContext } from "../../ApiContext";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../LoginContext";
import "../../Styles.css";

export function CreateRoomPage() {
  const { createRoom } = useContext(ApiContext);
  const navigate = useNavigate();
  const { user } = useContext(LoginContext)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const roomData = {
      name,
      description,
      userId: user && user._id // Room connected to logged in user.
    };

    createRoom(roomData)
      .then(() => {
        setSuccessMessage("Room created!");
        navigate("/chatroom");
      })
      .catch((error) => {
        setErrorMessage("Could not add the room.");
        console.error("Error adding room", error);
      });
  }

  return (
    <form className="object-form" onSubmit={handleSubmit}>
      <h2>Create a Chat Room</h2>

      <div>
        <label>Name:</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit">Create Room</button>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}
