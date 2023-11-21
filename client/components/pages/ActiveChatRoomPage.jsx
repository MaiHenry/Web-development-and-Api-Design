import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../../ApiContext";
import { LoginContext } from "../../LoginContext";

function MessageCard({ message }) {
  const timestamp = new Date(message.timestamp).toLocaleString();

  return (
    <div className="message-card">
      <p>
        <strong>{message.senderName}</strong> <span>{timestamp}</span>
      </p>
      <p>{message.content}</p>
    </div>
  );
}

export function ActiveChatRoomPage() {
  const { user } = useContext(LoginContext);
  const { fetchMessages, postMessage } = useContext(ApiContext);

  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const { roomId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchMessages(roomId)
      .then((data) => {
        setMessages(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [roomId, fetchMessages]);

  const handleSendMessage = () => {
    const messageData = {
      userId: user && user._id,
      content,
      timestamp: new Date().toISOString(),
    };

    postMessage(roomId, messageData)
      .then(() => {
        setSuccessMessage("Message sent");
      })
      .catch((err) => {
        console.error("Error sending message:", err);
      });
  };

  if (isLoading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Chat Room: {roomId}</h2>

      <div className="messages-container">
        {messages.map((message) => (
          <MessageCard key={message._id} message={message} />
        ))}
      </div>

      <div className="message-input">

        <form className="object-form" onSubmit={(e) => e.preventDefault()}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a message ..."
          />
          <button type="submit" onClick={handleSendMessage}>
            Send
          </button>
          {successMessage && <div>{successMessage}</div>}
        </form>
      </div>
    </div>
  );
}
