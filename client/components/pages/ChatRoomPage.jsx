import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../../ApiContext';

function ChatRoomCard({ room, onDelete, onEdit }) {
    return (
      <div>
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <button onClick={() => onEdit(room._id)}>Edit</button>
        <button onClick={() => onDelete(room._id)}>Delete</button>
      </div>
    );
  }
  

export function ChatRoomPage() {
  const [chatRooms, setChatRooms] = useState([]);
  const { fetchChatRooms, deleteRoom } = useContext(ApiContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchChatRooms()
      .then(data => {
        setChatRooms(data);
        setIsLoading(false);
      })
      .catch(err => {
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
        setChatRooms(prevRooms => prevRooms.filter(room => room._id !== chatRoomId));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  function editRoom(chatRoomId) {
    navigate(`/edit/${chatRoomId}`);
  }

  return (
    <div>
      <h2>Available rooms</h2>
      <ul>
        {chatRooms.map(room => (
          <ChatRoomCard 
          key={room._id}
          room={room}
          onEdit={editRoom}
          onDelete={() => handleDeleteRoom(room._id)}
          />
        ))}
      </ul>
    </div>
  );
}
