import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../../ApiContext';

function ChatRoomCard({ room, onDelete, onEdit }) {
    return (
      <div>
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <button onClick={() => onEdit(room._id)}>Edit</button>
      </div>
    );
  }
  

export function ChatRoomPage() {
  const [chatRooms, setChatRooms] = useState([]);
  const { fetchChatRooms } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadChatRooms = async () => {
      try {
        const rooms = await fetchChatRooms();
        setChatRooms(rooms);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

    loadChatRooms();
  }, [fetchChatRooms]);

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
          />
        ))}
      </ul>
    </div>
  );
}
