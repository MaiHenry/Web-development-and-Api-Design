import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../../ApiContext";
import { LoginContext } from "../../LoginContext";
import "../../Styles.css";

function MessageCard({ message }) {
  const timestamp = new Date(message.timestamp).toLocaleString();
  return (
    <div className="message-card">
      <span className="timestamp">{timestamp}</span>
      <p>
        <strong>{message.name?.profileName}</strong>
      </p>
      <p>{message.content}</p>
    </div>
  );
}

export function ActiveChatRoomPage() {
  const { roomId } = useParams();
  const { user, profileName} = useContext(LoginContext);
  const { fetchMessages, postMessage, fetchChatRoomById } = useContext(ApiContext);

  const [roomDetails, setRoomDetails] = useState({});
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [webSocket, setWebSocket] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetchChatRoomById(roomId)
      .then((room) => {
        setRoomDetails(room);
        return fetchMessages(roomId);
      })
      .then((messages) => {
        setMessages(messages);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setIsLoading(false);
      });
      const webSocket = new WebSocket("ws://" + window.location.host);
      webSocket.onmessage = (event) => {
        console.log(event.data);
        setMessages((current) => [...current, JSON.parse(event.data)]);
      };
      setWebSocket(webSocket);
  }, [roomId, fetchChatRoomById, fetchMessages]);

  const handleSendMessage = () => {
    const timestamp = new Date().toISOString();
    const messageData = {
      name: {profileName},
      userId: user?._id,
      content,
      timestamp,
    };

    webSocket.send(JSON.stringify(messageData));


    postMessage(roomId, messageData)
      .then(() => {
        setContent("");
        return fetchMessages(roomId);
      })
      .then((updatedMessages) => {
        setMessages(updatedMessages);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>{roomDetails.name}</h2>
      <p>{roomDetails.description}</p>

      <div className="messages-container">
        {messages.map((message) => (
          <MessageCard key={message._id} message={message} />
        ))}
      </div>

      <div className="message-input">
        <form class="object-form" onSubmit={(e) => e.preventDefault()}>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a message..."
          />
          <button type="submit" onClick={handleSendMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}